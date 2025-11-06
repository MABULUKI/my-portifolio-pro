import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const contactRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);

        // EmailJS configuration
        const serviceID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_pw6tc5c';
        const templateID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_b3f6e06';
        const userID = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'gNzBJoLvIm1QS_MWx';

        // Prepare the template parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Maulid Mabuluki',
        };

        // Send the email using EmailJS
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then((response: { status: any; text: any; }) => {
                console.log('SUCCESS!', response.status, response.text);
                setFormStatus('Thank you for your message! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
                setIsSubmitting(false);
                setTimeout(() => setFormStatus(''), 5000);
            })
            .catch((err: any) => {
                console.log('FAILED...', err);
                setFormStatus('Something went wrong. Please try again later.');
                setIsSubmitting(false);
                setTimeout(() => setFormStatus(''), 5000);
            });
    };

    const contactInfo = [
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: "Email",
            value: "mabulukimaulid09@gmail.com",
            link: "mailto:mabulukimaulid09@gmail.com"
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            label: "Phone",
            value: "+255 755935952",
            link: "tel:+255 755935952"
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: "Location",
            value: "Dar es Salaam, Tanzania",
            link: "#"
        }
    ];

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            link: "#"
        },
        {
            name: "Twitter",
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            link: "#"
        },
        {
            name: "Instagram",
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.318.975.975 1.256 2.242 1.318 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.343 2.633-1.318 3.608-.975.975-2.242 1.256-3.608 1.318-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.343-3.608-1.318-.975-.975-1.256-2.242-1.318-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.343-2.633 1.318-3.608C4.526 2.506 5.793 2.225 7.159 2.163 8.425 2.105 8.805 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.743.128 4.63.38 3.68 1.33c-.95.95-1.202 2.063-1.26 3.372C2.012 6.668 2 7.077 2 12c0 4.923.012 5.332.07 6.612.058 1.309.31 2.422 1.26 3.372.95.95 2.063 1.202 3.372 1.26 1.28.058 1.689.07 6.618.07s5.332-.012 6.612-.07c1.309-.058 2.422-.31 3.372-1.26.95-.95 1.202-2.063 1.26-3.372.058-1.28.07-1.689.07-6.618s-.012-5.332-.07-6.612c-.058-1.309-.31-2.422-1.26-3.372-.95-.95-2.063-1.202-3.372-1.26C17.332.012 16.923 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
            ),
            link: "#"
        },
        {
            name: "Facebook",
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.326 24h11.495v-9.294H9.691V11.07h3.13V8.414c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.313h3.587l-.467 3.636h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.405 0 22.675 0z" />
                </svg>
            ),
            link: "#"
        }
    ];

    return (
        <div ref={contactRef} className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                        <span className="relative z-10">Contact Me</span>
                        <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-50 z-0 transform -skew-x-12"></span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Reach out for collaborations or mineral-related projects</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className={`bg-white transition-all duration-300 
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 rounded-2xl shadow-xl p-8 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                        style={{ transitionDelay: '300ms' }}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
                        {formStatus && (
                            <div className={`mb-4 p-4 rounded-lg ${formStatus.includes('Thank you') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                                {formStatus}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting
                                    ? 'bg-gray-400 text-blue-300 cursor-not-allowed'
                                    : 'bg-blue-50 text-blue-500'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className={`space-y-8 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                        style={{ transitionDelay: '500ms' }}>
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                {contactInfo.map((info, idx) => (
                                    <a
                                        key={idx}
                                        href={info.link}
                                        className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 text-blue-600">
                                            {info.icon}
                                        </div>
                                        <div className="flex-1 pe-14">
                                            <p className="text-sm sm:text-base text-gray-500 break-words">{info.label}</p>
                                            <p className="text-gray-900 font-medium text-sm sm:text-xs break-words truncate overflow-hidden">{info.value}</p>
                                        </div>

                                    </a>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl shadow-xl p-8 
                transition-all duration-300 
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Me</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        className="bg-gray-100 rounded-full p-3 text-gray-700 
                   hover:bg-blue-100 hover:text-blue-600 
                   transition-all duration-200 transform hover:scale-110"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;