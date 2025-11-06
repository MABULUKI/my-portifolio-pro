import React, { type ReactNode, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "../index.css";

interface MainLayoutProps {
  children: ReactNode;
}

const staticHeroImages = [
  "https://media.istockphoto.com/id/637053976/photo/the-gypsum-quarry-of-toconao.jpg?s=612x612&w=0&k=20&c=Ywa3UY_kRrcLF_Y2aiDaSJ7Ghz9MnhzpJesHf8Nmhbg=",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80",
];

interface HeroImage {
  _id: string;
  _creationTime: number;
  image: string;
  title?: string;
  subtitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const fetchedHeroImages = useQuery(api.functions.heroImages.getHeroImages) ?? [];

  const heroImages: string[] =
    fetchedHeroImages.length > 0
      ? (fetchedHeroImages as unknown as HeroImage[]).map(h => h.image)
      : staticHeroImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setScrolledPastHero(window.scrollY >= heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-light-text-primary dark:text-dark-text-primary overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-lg">
        <Navbar scrolledPastHero={scrolledPastHero} />
      </div>

      {/* Hero Section */}
      <div
        className="relative w-screen max-w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${heroImages[currentIndex]}')` }}
      >
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
            Welcome to My Portfolio
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full max-w-full relative z-10 mt-[70px] sm:mt-[80px] px-4 sm:px-6 md:px-8 lg:px-12">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
