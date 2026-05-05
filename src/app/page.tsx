import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import DomainHosting from "@/components/DomainHosting";
import Calculator from "@/components/Calculator";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><HowItWorks /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Quote /></Reveal>
      <Reveal><WhyUs /></Reveal>
      <Reveal><Pricing /></Reveal>
      <Reveal><DomainHosting /></Reveal>
      <Reveal><Calculator /></Reveal>
      <Reveal><Booking /></Reveal>
      <Reveal><FAQ /></Reveal>
    </>
  );
}
