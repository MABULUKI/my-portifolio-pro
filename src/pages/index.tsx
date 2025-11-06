import Myservices from "./Myservices";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Insights from "./Insights";

const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Insights Section */}
        <section id="insights" className="mt-16">
          <Insights />
        </section>

        {/* Services Section */}
        <section id="services" className="mt-16">
          <Myservices />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mt-16">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-16">
          <Contact />
        </section>

      </div>
    </div>
  );
};

export default Home;
