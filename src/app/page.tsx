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

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Gallery />
      <Quote />
      <WhyUs />
      <Pricing />
      <DomainHosting />
      <Calculator />
      <Booking />
      <FAQ />
    </>
  );
}
