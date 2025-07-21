import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBg from '../assets/images/hero-bgg.jpeg';

const Hero = () => {
    return (
        <section className="relative py-32 md:py-40 overflow-hidden bg-no-repeat bg-center bg-cover">
            {/* Zooming Background using Framer Motion */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${heroBg})` }}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Hero Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Join{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              CivicHub
            </span>{' '}
                        and Transform Your Community
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                        Report civic issues, track progress in real-time, and collaborate with local authorities — all from your device.
                        Be a part of the change you want to see around you.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/login">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 shadow-md transition">
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-semibold border border-white bg-transparent text-white hover:bg-white hover:text-blue-600 h-12 px-8 transition">
                            Learn More
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;



