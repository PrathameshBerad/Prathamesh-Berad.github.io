import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import AvatarScene from "./AvatarScene";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { asset } from "../../assetUrl";

const Avatar = () => {
  const { setLoading } = useLoading();
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = setProgress((value) => setLoading(value));
    let done = false;

    const reveal = () => {
      if (done) return;
      done = true;
      progress.loaded().then(() => {
        modelRef.current?.classList.add("character-loaded");
        // Wire up the scroll choreography once the hero is on screen.
        setCharTimeline();
        setAllTimeline();
      });
    };

    // Drive the loader off the real portrait load, with a safety timeout so
    // the experience never gets stuck behind a slow/failed image request.
    new THREE.TextureLoader()
      .loadAsync(asset("images/avatar.png"))
      .then(reveal)
      .catch(reveal);
    const fallback = window.setTimeout(reveal, 4000);

    return () => window.clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={modelRef}>
        <div className="character-rim"></div>
        <Canvas
          className="avatar-canvas"
          camera={{ position: [0, 0, 7], fov: 38 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <AvatarScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Avatar;
