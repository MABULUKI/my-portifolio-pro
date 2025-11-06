import { useEffect, useRef, useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; // Adjust path

interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  featured?: boolean;
}
const projectsData: Project[] = [
  {
    title: "Mining Operation Dashboard",
    description:
      "A comprehensive dashboard for monitoring mining operations with real-time data visualization and analytics.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    link: "#",
    featured: true,
  },
  {
    title: "Mineral Investment Analytics",
    description:
      "Data-driven platform for analyzing investment opportunities in the mineral and mining sector.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["Angular", "D3.js", "Python", "AWS"],
    link: "#",
    featured: false,
  },
  {
    title: "Mining Operation Dashboard",
    description:
      "A comprehensive dashboard for monitoring mining operations with real-time data visualization and analytics.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    link: "#",
    featured: true,
  },
  {
    title: "Mineral Investment Analytics",
    description:
      "Data-driven platform for analyzing investment opportunities in the mineral and mining sector.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["Angular", "D3.js", "Python", "AWS"],
    link: "#",
    featured: false,
  },
  {
    title: "Mining Operation Dashboard",
    description:
      "A comprehensive dashboard for monitoring mining operations with real-time data visualization and analytics.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    link: "#",
    featured: true,
  },
  {
    title: "Mineral Investment Analytics",
    description:
      "Data-driven platform for analyzing investment opportunities in the mineral and mining sector.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    technologies: ["Angular", "D3.js", "Python", "AWS"],
    link: "#",
    featured: false,
  },
];

const tabs = ["All Projects", "Web Applications", "Mobile Apps", "Data Analytics"];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All Projects");
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchedProjects = useQuery(api.functions.projects.getProjects) as Project[] | undefined;
  useEffect(() => {
    setIsLoading(fetchedProjects === undefined);
  }, [fetchedProjects]);

  const projectsToShow = fetchedProjects && fetchedProjects.length > 0
    ? fetchedProjects
    : projectsData;


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  return (
    <section
      ref={projectsRef}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10">My Projects</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-50 z-0 transform -skew-x-12"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing innovative solutions for the mining industry
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center mb-12 gap-3 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          style={{ transitionDelay: "200ms" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === tab
                  ? "bg-blue-50 text-blue-600 shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ?
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
            )) :projectsToShow.map((project, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center transition-colors duration-300"
                  >
                    View Project
                    <svg
                      className="h-4 w-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        
        }
          
        </div>
      </div>
    </section>
  );
};

export default Projects;
