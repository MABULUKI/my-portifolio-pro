import { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

interface Project { _id?: string; title: string; }
interface Blog { _id?: string; title: string; }
interface HeroImage { _id?: string; title?: string; }
interface Service { _id?: string; title: string; }

const fallbackData = {
  projects: [{ _id: "1", title: "Sample Project" }],
  blogs: [{ _id: "1", title: "Sample Blog" }],
  heroImages: [{ _id: "1", title: "Sample Image" }],
  services: [{ _id: "1", title: "Sample Service" }],
};

const DashboardOverview = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackData.projects);
  const [blogs, setBlogs] = useState<Blog[]>(fallbackData.blogs);
  const [images, setImages] = useState<HeroImage[]>(fallbackData.heroImages);
  const [services, setServices] = useState<Service[]>(fallbackData.services);

  const overviewRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchedProjects = useQuery(api.functions.projects.getProjects) as Project[] | undefined;
  const fetchedBlogs = useQuery(api.functions.blogs.getBlogs) as Blog[] | undefined;
  const fetchedImages = useQuery(api.functions.heroImages.getHeroImages) as HeroImage[] | undefined;
  const fetchedServices = useQuery(api.functions.services.getServices) as Service[] | undefined;

  useEffect(() => {
    setProjects(fetchedProjects && fetchedProjects.length > 0 ? fetchedProjects : fallbackData.projects);
    setBlogs(fetchedBlogs && fetchedBlogs.length > 0 ? fetchedBlogs : fallbackData.blogs);
    setImages(fetchedImages && fetchedImages.length > 0 ? fetchedImages : fallbackData.heroImages);
    setServices(fetchedServices && fetchedServices.length > 0 ? fetchedServices : fallbackData.services);
  }, [fetchedProjects, fetchedBlogs, fetchedImages, fetchedServices]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (overviewRef.current) observer.observe(overviewRef.current);
    return () => { if (overviewRef.current) observer.unobserve(overviewRef.current); };
  }, []);

  const stats = [
    { title: "Total Projects", value: projects.length, color: "bg-blue-500" },
    { title: "Total Images", value: images.length, color: "bg-green-500" },
    { title: "Published Blogs", value: blogs.length, color: "bg-yellow-500" },
    { title: "Total Services", value: services.length, color: "bg-purple-500" },
  ];

  return (
    <section ref={overviewRef} className="min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-bold text-blue-500 text-lg sm:text-2xl">Dashboard Overview</h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">
            Quick summary of all your projects, images, blogs, and services
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              dir="ltr"
              className={`p-4 sm:p-6 rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${stat.color} text-white`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <h4 className="text-sm sm:text-base">{stat.title}</h4>
              <p className="mt-2 text-lg sm:text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Insights */}
        <div className={`mt-8 sm:mt-12 bg-white rounded-md shadow-sm p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Insights</h3>
          <ul className="list-disc marker:text-blue-500 marker:text-xl list-inside text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>Most recent project: {projects[0]?.title || "N/A"}</li>
            <li>Latest blog post: {blogs[0]?.title || "N/A"}</li>
            <li>Total images: {images.length}</li>
            <li>Total services offered: {services.length}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
