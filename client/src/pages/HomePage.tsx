import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import Products from "@/components/home/Products";
import Clients from "@/components/home/Clients";
import Contact from "@/components/home/Contact";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Gromarbre | Luxury Marble Solutions</title>
        <meta name="description" content="Gromarbre is a leading marble company in Casablanca, Morocco specializing in luxury marble projects for over 20 years." />
      </Helmet>
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Products />
        <Clients />
        <Contact />
      </main>
    </>
  );
};

export default HomePage;
