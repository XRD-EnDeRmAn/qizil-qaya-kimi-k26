import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

vec2 fluidRipple(vec2 uv, vec2 mouse, vec2 mouseVel, float time) {
  float dist = length(uv - mouse);
  float ripple = sin(dist * 30.0 - time * 4.0) * 0.5 + 0.5;
  float velMag = length(mouseVel);
  float influence = smoothstep(0.5, 0.0, dist) * velMag;
  ripple *= influence;
  vec2 disp = normalize(uv - mouse) * ripple * 0.05;
  return disp;
}

void main() {
  vec2 uv = vUv * iResolution;
  uv.x *= iResolution.x / iResolution.y;

  vec2 mouse = iMouse.xy / iResolution.xy;
  mouse.x *= iResolution.x / iResolution.y;
  vec2 mouseVel = (iMouse.xy - iMouse.zw) / iResolution.xy;

  float t = iTime * 0.15;

  float f1 = fbm(uv * 3.0 + t);
  float f2 = fbm(uv * 2.0 - t * 0.7 + vec2(f1 * 0.5, 0.0));
  float f3 = fbm(uv * 4.0 + t * 1.3 + vec2(0.0, f2 * 0.3));

  float fluid = f1 * 0.5 + f2 * 0.3 + f3 * 0.2;

  vec2 disp = fluidRipple(uv, mouse, mouseVel, iTime);
  uv += disp;

  float nf1 = fbm(uv * 3.0 + t);
  float nf2 = fbm(uv * 2.0 - t * 0.7 + vec2(nf1 * 0.5, 0.0));
  float nf3 = fbm(uv * 4.0 + t * 1.3 + vec2(0.0, nf2 * 0.3));

  float metal = nf1 * 0.5 + nf2 * 0.3 + nf3 * 0.2;

  float r = 0.06 + 0.04 * sin(metal * 8.0 + t * 2.0);
  float g = 0.15 + 0.08 * sin(metal * 6.0 + t * 1.5 + 2.0);
  float b = 0.08 + 0.05 * sin(metal * 10.0 + t * 2.5 + 4.0);

  vec3 col = vec3(r, g, b);

  float spec1 = pow(sin(metal * 12.0 + t * 3.0) * 0.5 + 0.5, 8.0);
  float spec2 = pow(sin(metal * 20.0 - t * 2.0) * 0.5 + 0.5, 16.0);
  col += vec3(0.8, 0.7, 0.4) * spec1 * 0.3;
  col += vec3(1.0, 0.95, 0.7) * spec2 * 0.15;

  float edge = length(vUv - vec2(0.5, 0.5));
  float vignette = 1.0 - smoothstep(0.4, 1.2, edge);
  col *= 0.7 + 0.3 * vignette;

  float grain = hash(vUv * iResolution + fract(iTime) * 100.0);
  col += (grain - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`

export default function FluidCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.position.set(0, 0, 1)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iChannel0: { value: null },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const mouseRef = { x: 0, y: 0, prevX: 0, prevY: 0 }
    const targetMouseRef = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.prevX = targetMouseRef.x
      mouseRef.prevY = targetMouseRef.y
      targetMouseRef.x = e.clientX
      targetMouseRef.y = window.innerHeight - e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    const animate = () => {
      mouseRef.x += (targetMouseRef.x - mouseRef.x) * 0.08
      mouseRef.y += (targetMouseRef.y - mouseRef.y) * 0.08

      material.uniforms.iTime.value += 0.016
      material.uniforms.iMouse.value.set(
        mouseRef.x,
        mouseRef.y,
        mouseRef.prevX,
        mouseRef.prevY
      )

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleResize = () => {
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight)
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
