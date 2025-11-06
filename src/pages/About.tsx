import  { useEffect, useRef, useState } from 'react';
import profile_picture from "../assets/WIN_20251104_16_55_26_Pro.jpg"
const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    const aboutMeData = {
        name: "Maulid Mabuluki",
        profilePicture: {profile_picture},
        title: "Minerals & Mining Enthusiast | Consultant | Digital Strategist",

        description:
            "I am a passionate minerals and mining professional dedicated to bridging traditional mining with modern technology and sustainable practices. My goal is to empower communities, investors, and small-scale miners through innovative digital tools and data-driven insights.",

        whatIDo: [
            "Mining project consultation and digital documentation",
            "Market insights for mineral trade and investment opportunities",
            "Designing clean, accessible web platforms for mineral portfolios",
            "GIS and data analytics for resource mapping and monitoring",
        ],

        history:
            "After completing my studies in Computer Science and developing an interest in mineral economics, I began working on tech-based mining solutions. Over time, I've collaborated with traders, investors, and local miners — providing advisory, branding, and digital transformation services for the mineral sector.",

        vision:
            "To modernize the mineral sector through digital platforms, transparency, and sustainable practices that benefit both investors and communities.",

        mission:
            "To create value in the mining industry by combining technology, design, and responsible business models that support local and international collaboration.",

        coreValues: [
            "Transparency",
            "Sustainability",
            "Innovation",
            "Integrity",
            "Community Empowerment",
        ],

        team: [
            {
                name: "David Kimaro",
                phone: "255692671206",
                role: "Analyst",
                picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800",
            },
            {
                name: "Rehema Said",
                phone: "255692671206",
                role: "Manager",
                picture: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
            },
        ],
    };

    return (
        <div ref={aboutRef} className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                        <span className="relative z-10">About Me</span>
                        <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-50 z-0 transform -skew-x-12"></span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{aboutMeData.title}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile */}
                    <div className={`lg:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-60 opacity-75"></div>
                                <img
                                    src={profile_picture}
                                    alt="profile image"
                                    className="w-full h-64 object-cover saturate-150"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{aboutMeData.name}</h3>
                                <p className="text-gray-600 text-center mb-4">{aboutMeData.title}</p>
                                <p className="text-gray-700 text-center">{aboutMeData.description}</p>
                                
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What I Do</h4>
                                    <ul className="space-y-2">
                                        {aboutMeData.whatIDo.map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Vision Card */}
                        <div className={`bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                             style={{ transitionDelay: '500ms' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 rounded-full p-3 mr-4">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h5 className="text-2xl font-bold text-gray-900">Vision</h5>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{aboutMeData.vision}</p>
                        </div>

                        {/* Mission Card */}
                        <div className={`bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                             style={{ transitionDelay: '700ms' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 rounded-full p-3 mr-4">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h5 className="text-2xl font-bold text-gray-900">Mission</h5>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{aboutMeData.mission}</p>
                        </div>

                        {/* History Card */}
                        <div className={`bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                             style={{ transitionDelay: '900ms' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 rounded-full p-3 mr-4">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h5 className="text-2xl font-bold text-gray-900">History</h5>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{aboutMeData.history}</p>
                        </div>

                        {/* Core Values Card */}
                        <div className={`bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                             style={{ transitionDelay: '1100ms' }}>
                            <div className="flex items-center mb-6">
                                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <h5 className="text-2xl font-bold text-gray-900">Core Values</h5>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {aboutMeData.coreValues.map((core, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-sm font-medium text-gray-800 border border-blue-200 transform transition-all duration-300 hover:scale-110 hover:shadow-md"
                                    >
                                        {core}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* My Team Card */}
                        <div className={`bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                             style={{ transitionDelay: '1300ms' }}>
                            <div className="flex items-center mb-6">
                                <div className="bg-red-100 rounded-full p-3 mr-4">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h5 className="text-2xl font-bold text-gray-900">My Team</h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {aboutMeData.team.map((member, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                        <div className="relative">
                                            <img
                                                src={member.picture}
                                                alt={member.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                                                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-gray-900">{member.name}</h6>
                                            <p className="text-sm text-gray-600">{member.role}</p>
                                            {member.phone && (
                                                <a href={`tel:${member.phone}`} className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1">
                                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    {member.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;