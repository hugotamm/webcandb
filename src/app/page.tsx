import Header from "@/components/Header";
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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </>
  );
}
