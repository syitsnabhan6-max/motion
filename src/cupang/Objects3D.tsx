import React, { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  staticFile,
  delayRender,
  continueRender,
  cancelRender,
} from "remotion";
import { m, path } from "./motion";

type Rig = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  candles: THREE.Group;
  mark: THREE.Group;
  ring: THREE.Mesh;
  light: THREE.PointLight;
};
export const Objects3D: React.FC<{ t: number }> = ({ t }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const rig = useRef<Rig | null>(null);
  const [handle] = useState(() => delayRender("Load Cupang brand texture"));
  const ready = useRef(false);
  useLayoutEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: ref.current!,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(1100, 900);
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1100 / 900, 0.1, 100);
    scene.add(new THREE.AmbientLight("#ffc0c5", 1.5));
    const key = new THREE.DirectionalLight("#ffffff", 5);
    key.position.set(-5, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#ff4058", 8);
    rim.position.set(5, 0, -2);
    scene.add(rim);
    const light = new THREE.PointLight("#f03240", 55, 30, 2);
    light.position.set(2, 2, 4);
    scene.add(light);
    const mat = new THREE.MeshPhysicalMaterial({
      color: "#ef3044",
      metalness: 0.55,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      emissive: "#830d26",
      emissiveIntensity: 0.2,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: "#2a171d",
      metalness: 0.7,
      roughness: 0.21,
      clearcoat: 1,
    });
    const white = new THREE.MeshStandardMaterial({
      color: "#ffe4e8",
      metalness: 0.5,
      roughness: 0.15,
      emissive: "#a71b33",
      emissiveIntensity: 0.5,
    });
    function bar(w: number, h: number, d: number) {
      const r = 0.12,
        s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      const g = new THREE.ExtrudeGeometry(s, {
        depth: d,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.07,
        bevelThickness: 0.07,
        curveSegments: 8,
      });
      g.translate(0, 0, -d / 2);
      return g;
    }
    const candles = new THREE.Group();
    const heights = [1.1, 1.9, 1.35, 2.6, 1.8];
    heights.forEach((h, i) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(bar(0.55, h, 0.48), i === 1 ? dark : mat);
      g.add(body);
      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, h + 0.9, 10),
        white,
      );
      g.add(wick);
      g.position.set((i - 2) * 0.92, (i - 2) * 0.18, Math.sin(i) * 0.2);
      candles.add(g);
    });
    scene.add(candles);
    // Only the PULSE glyph is replaced by the Cupang logo; the mark rig and torus stay.
    const mark = new THREE.Group();
    const texture = new THREE.TextureLoader().load(
      staticFile("cupang/cupang.png"),
      () => {
        ready.current = true;
        continueRender(handle);
        if (rig.current)
          rig.current.renderer.render(rig.current.scene, rig.current.camera);
      },
      undefined,
      (err) =>
        cancelRender(
          err instanceof Error ? err : new Error("Cupang logo could not load"),
        ),
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    const pulse = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 3.4),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    );
    mark.add(pulse);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.035, 12, 100),
      white,
    );
    ring.rotation.x = 0.9;
    mark.add(ring);
    scene.add(mark);
    rig.current = { renderer, scene, camera, candles, mark, ring, light };
    return () => {
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((v) =>
            v.dispose(),
          );
        }
      });
      texture.dispose();
      renderer.dispose();
      rig.current = null;
      if (!ready.current) continueRender(handle);
    };
  }, []);
  useLayoutEffect(() => {
    const r = rig.current;
    if (!r) return;
    const c = m(t, 2.65, 3.6, 1, 0);
    r.candles.visible = t < 3.6;
    r.candles.scale.setScalar(Math.max(0.0001, c));
    r.candles.rotation.set(
      -0.12,
      path(t, [0, 1.5, 3.6], [-0.65, 0.12, 0.6]),
      -0.1,
    );
    r.candles.position.y = -0.45 + m(t, 2.65, 3.6, 0, -1.2);
    r.candles.children.forEach((o, i) => {
      o.position.y = (i - 2) * 0.18 + Math.sin(t * 0.7 + i * 0.8) * 0.12;
      o.scale.y = 0.85 + 0.15 * outReveal(t, i * 0.09);
    });
    const reveal = m(t, 18.1, 20);
    r.mark.visible = t > 18.1;
    r.mark.scale.setScalar(
      Math.max(0.0001, reveal * path(t, [18, 20, 24], [0.6, 0.7, 0.64])),
    );
    r.mark.rotation.set(
      path(t, [18, 20, 24], [0.4, -0.08, 0.08]),
      path(t, [18, 20, 24], [-1.3, -0.15, 0.22]),
      0,
    );
    r.mark.position.y = path(t, [18, 20, 24], [0.2, 0.6, 0.8]);
    r.ring.rotation.z = t * 0.16;
    r.camera.position.set(
      path(t, [0, 3.6, 18, 20, 24], [1.7, -0.2, 0.2, 0.15, -0.25]),
      1.1,
      path(t, [0, 1.5, 3.6, 18, 20, 24], [11.3, 10.4, 8.8, 11, 10.5, 11.5]),
    );
    r.camera.lookAt(0, 0.3, 0);
    r.light.position.x = Math.sin(t * 0.6) * 4;
    r.renderer.render(r.scene, r.camera);
  }, [t]);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        left: 680,
        top: -200,
        width: 1100,
        height: 900,
      }}
    />
  );
};
const outReveal = (t: number, a: number) =>
  1 - Math.pow(1 - Math.min(1, Math.max(0, (t - a) / 1.3)), 4);
