"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Approche from "@/components/Approche";
import Realisations from "@/components/Realisations";
import Temoignages from "@/components/Temoignages";
import Apropos from "@/components/Apropos";
import Engagement from "@/components/Engagement";
import Expertises from "@/components/Expertises";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Approche />
        <Realisations />
        <Temoignages />
        <Apropos />
        <Engagement />
        <Expertises />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
