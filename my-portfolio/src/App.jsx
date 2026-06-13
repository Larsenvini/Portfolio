import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Cursor from "./components/ui/Cursor";
import InferenceBar from "./components/ui/InferenceBar";

import Hero from "./components/sections/Hero";
import Manifesto from "./components/sections/Manifesto";
import Pillars from "./components/sections/Pillars";
import EvalReport from "./components/sections/EvalReport";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Timeline from "./components/sections/Timeline";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickFn);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <div className={`page-loader${!loading ? " hidden" : ""}`}>
        <div className="loader-prompt">
          <span className="k">initializing</span>{" "}
          <span className="v">portfolio.v5</span>
        </div>
        <div className="loader-bar" />
        <div className="loader-prompt" style={{ fontSize: "9px", letterSpacing: "0.22em" }}>
          loading model weights · context: 8192 tokens
        </div>
      </div>

      <Cursor />
      <Header />
      <InferenceBar />
      <main>
        <Hero />
        <Manifesto />
        <Pillars />
        <EvalReport />
        <Work />
        <About />
        <Timeline />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
