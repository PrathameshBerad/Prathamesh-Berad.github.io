import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-linked choreography for the hero avatar and the landing → about →
 * what-I-do hand-off. The reference drove a rigged character's bones here;
 * with the floating-portrait avatar we animate its container instead, keeping
 * the same "the hero glides aside and lifts away as you scroll" feel.
 */
export function setCharTimeline() {
  if (window.innerWidth <= 1024) {
    // Mobile: just reveal the What-I-Do cards on scroll.
    gsap
      .timeline({
        scrollTrigger: { trigger: ".what-box-in", start: "top 70%" },
      })
      .to(".what-box-in", { display: "flex", duration: 0.1 }, 0);
    return;
  }

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tl1
    .fromTo(
      ".character-model",
      { x: 0, scale: 1 },
      { x: "-22%", scale: 0.92, duration: 1 },
      0
    )
    .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
    .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
    .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0)
    .fromTo(".character-rim", { opacity: 0.9 }, { opacity: 0.45, duration: 1 }, 0);

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tl2
    .to(".about-section", { y: "30%", duration: 6 }, 0)
    .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
    .to(".character-model", { x: "-10%", duration: 5, delay: 2 }, 0)
    .fromTo(
      ".what-box-in",
      { display: "none" },
      { display: "flex", duration: 0.1, delay: 6 },
      0
    )
    .fromTo(
      ".character-rim",
      { opacity: 0.45, scaleX: 1.4 },
      { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
      0.3
    );

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tl3
    .fromTo(
      ".character-model",
      { y: "0%" },
      { y: "-110%", duration: 4, ease: "none", delay: 1 },
      0
    )
    .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0);
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      { animationIterationCount: "1", delay: 0.3, duration: 0.1 },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  }
}
