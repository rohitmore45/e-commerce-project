import React from "react";
import HeroSection from "../../components/Herosection/HeroSection";
import Service from "../../components/Service/Service";
import Gallery from "../../components/Gallery/Gallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Service />
      <Gallery />
    </>
  );
}
