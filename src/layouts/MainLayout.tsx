import React, { type ReactNode, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "../index.css"

interface MainLayoutProps {
  children: ReactNode;
}

// Static fallback images
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

  // ✅ Fetch hero images using Convex function reference
  const fetchedHeroImages = useQuery(api.functions.heroImages.getHeroImages) ?? [];

  // Use dynamic images if available, otherwise fallback
  const heroImages: string[] =
  fetchedHeroImages.length > 0
    ? (fetchedHeroImages as unknown as HeroImage[]).map(h => h.image)
    : staticHeroImages;


  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // Track scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setScrolledPastHero(window.scrollY >= heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-light-text-primary dark:text-dark-text-primary">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-lg">
        <Navbar scrolledPastHero={scrolledPastHero} />
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${heroImages[currentIndex]}')` }}
      >
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Welcome to My Portfolio
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full relative z-10 mt-[80px]">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
