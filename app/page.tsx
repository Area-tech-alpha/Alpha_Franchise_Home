import AntesDepois from "@/components/sections/antes-depois";
import CasePizzaria from "@/components/sections/case-pizzaria";
import CtaFinal from "@/components/sections/cta-final";
import Depoimentos from "@/components/sections/depoimentos";
import Faq from "@/components/sections/faq";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Historia from "@/components/sections/historia";
import Lideranca from "@/components/sections/lideranca";
import LogosMarquee from "@/components/sections/logos-marquee";
import Mapa from "@/components/sections/mapa";
import Metodologia from "@/components/sections/metodologia";
import Midia from "@/components/sections/midia";
import Numeros from "@/components/sections/numeros";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CasePizzaria />
        <LogosMarquee />
        <Lideranca />
        <Numeros />
        <Historia />
        <Midia />
        <AntesDepois />
        <Metodologia />
        <Mapa />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
