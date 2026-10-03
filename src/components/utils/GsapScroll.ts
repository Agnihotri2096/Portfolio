import * as THREE from "three";
import gsap from "gsap";

function findMeshes(
  character: THREE.Object3D | null,
  getIntensity: () => number
): {
  monitor: THREE.Mesh | null;
  screenLight: THREE.Mesh | null;
} {
  let monitor: THREE.Mesh | null = null;
  let screenLight: THREE.Mesh | null = null;

  if (!character) {
    return { monitor, screenLight };
  }

  character.traverse((child: THREE.Object3D) => {
    if (child.name === "Plane004" && "material" in child) {
      const mesh = child as THREE.Mesh;
      if (mesh.material && !Array.isArray(mesh.material)) {
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        monitor = mesh;
      }
    }
    if (child.name === "screenlight" && "material" in child) {
      const mesh = child as THREE.Mesh;
      if (mesh.material && !Array.isArray(mesh.material)) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.transparent = true;
        mat.opacity = 0;
        mat.emissive = new THREE.Color("#5eead4");

        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mat, {
          emissiveIntensity: () => getIntensity() * 6 + 2,
          duration: () => Math.random() * 0.5 + 0.2,
          delay: () => Math.random() * 0.1,
        });
        screenLight = mesh;
      }
    }
  });

  return { monitor, screenLight };
}

export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const { monitor, screenLight } = findMeshes(character, () => intensity);
  const neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024 && character) {
    // HERO SCROLL: Hero text fades, character slowly rotates, camera pushes in
    const tlHero = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    tlHero
      .fromTo(character.rotation, { y: 0 }, { y: 0.72, duration: 1 }, 0)
      .to(camera.position, { z: 18.5, y: 11.5, duration: 1 }, 0)
      .fromTo(".character-model", { x: "-50%" }, { x: "-18%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, y: -40, duration: 0.6 }, 0)
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, duration: 0.8 },
        0
      );

    // LAB PINNED SECTION: Character interacts with digital interface across AI, Software, Security, Automation
    const tlLab = gsap.timeline({
      scrollTrigger: {
        trigger: ".lab-section",
        start: "top top",
        end: "+=3200",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    if (monitor && monitor.material && !Array.isArray(monitor.material)) {
      tlLab.fromTo(
        monitor.position,
        { y: -6, z: 2 },
        { y: 0, z: 0, duration: 1 },
        0
      );
      tlLab.to(monitor.material, { opacity: 1, duration: 0.8 }, 0.2);
    }

    if (screenLight && screenLight.material && !Array.isArray(screenLight.material)) {
      const mat = screenLight.material as THREE.MeshStandardMaterial;
      tlLab.to(mat, { opacity: 1, duration: 0.8 }, 0.2);

      // Color shifts: AI (#5eead4) -> Software (#10b981) -> Security (#f43f5e) -> Automation (#a855f7)
      tlLab
        .to(mat.emissive, { r: 0.06, g: 0.72, b: 0.5, duration: 0.8 }, 0.8) // Emerald
        .to(mat.emissive, { r: 0.95, g: 0.24, b: 0.36, duration: 0.8 }, 1.8) // Crimson
        .to(mat.emissive, { r: 0.65, g: 0.33, b: 0.96, duration: 0.8 }, 2.6); // Purple
    }

    if (neckBone) {
      tlLab.to(neckBone.rotation, { x: 0.45, duration: 0.8 }, 0);
    }

    tlLab.to(character.rotation, { y: 0.85, x: 0.08, duration: 1.5 }, 0.5);

    // EXIT LAB INTO WORK: smooth transition out of view
    const tlExit = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    tlExit.to(
      ".character-model",
      { y: "-120%", opacity: 0, duration: 1.5, ease: "none" },
      0
    );
  }
}

export function setAllTimeline() {
  const processTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".how-we-build-section",
      start: "top 60%",
      end: "bottom 80%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  processTimeline.fromTo(
    ".process-progress-line",
    { scaleX: 0 },
    { scaleX: 1, duration: 1, ease: "none" },
    0
  );
}
