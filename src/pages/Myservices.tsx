import { useEffect, useRef, useState, type JSX } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; // adjust path

interface Service {
  _id?: string;
  title: string;
  description: string;
  details: string;
  icon?: JSX.Element; // optional, because backend may store icon as string
}

const servicesData: Service[] = [
  {
    title: "Mining Consultation",
    description: "Providing expert guidance on mineral exploration, extraction, and operational efficiency for mining projects.",
    details: "We provide tailored mining consultation including exploration planning, feasibility studies, operational optimization, and risk management. Our experts ensure efficiency and compliance with modern mining standards.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Mineral Analysis & Planning",
    description: "Conducting detailed mineral analysis and planning projects to ensure optimized resource utilization and profitability.",
    details: "Our mineral analysis uses modern laboratory techniques and digital mapping tools to optimize extraction processes and maximize profitability while maintaining sustainable practices.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "UX/UI Design for Mining Platforms",
    description: "Designing modern, user-friendly interfaces for mining management systems, dashboards, and digital solutions.",
    details: "Our UX/UI design ensures intuitive dashboards, efficient workflow, and responsive layouts to improve productivity and user satisfaction in mining platforms.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const MyServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  // Fetch services from backend
  const fetchedServices = useQuery(api.functions.services.getServices) as Service[] | undefined;

  // Use backend data if available, otherwise fallback to static
  const servicesToShow = fetchedServices && fetchedServices.length > 0 ? fetchedServices : servicesData;

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
    };
  }, []);

  const handleGetInTouch = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={servicesRef} className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10">My Services</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-50 z-0 transform -skew-x-12"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Specialized solutions for the modern mining industry</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesToShow.map((service, idx) => (
            <div
              key={service._id || idx}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + idx * 200}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-50 p-6 flex justify-center">
                <div className="bg-white rounded-full p-4 text-blue-600">{service.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-center">{service.description}</p>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-medium hover:bg-blue-100 transition-colors duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className={`mt-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
          <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Let's discuss how I can help you with your mining project or digital transformation needs.</p>
            <button
              onClick={handleGetInTouch}
              className="px-8 py-3 bg-blue-100 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedService(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative overflow-auto max-h-[90vh] transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg">✕</button>
            <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
            <p className="text-gray-700 leading-relaxed">{selectedService.details}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyServices;
