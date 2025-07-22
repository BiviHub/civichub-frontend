import { features } from "../constants";
import civicVideo from "../assets/videos/civic-demo.mp4";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Features = () => {
    const [visibleSet, setVisibleSet] = useState(0);
    const featuresPerSet = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleSet((prev) => (prev + 1) % Math.ceil(features.length / featuresPerSet));
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    const getCardColor = (index: number): string => {
        const hoverColors = [
            "hover:bg-blue-100 hover:text-blue-900",
            "hover:bg-green-100 hover:text-green-900",
            "hover:bg-yellow-100 hover:text-yellow-900",
            "hover:bg-purple-100 hover:text-purple-900"
        ];
        return hoverColors[index % hoverColors.length];
    };


    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Side - Video */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden shadow-xl border border-gray-200"
                >
                    <video
                        className="w-full h-auto rounded-lg"
                        src={civicVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </motion.div>

                {/* Right Side - Features */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                        Why Choose <span className="text-yellow-300">CivicHub</span>?
                    </h2>
                    <p className="text-lg text-white/80 mb-8">
                        Empower your community with a platform that makes civic engagement effective, transparent, and impactful.
                    </p>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={visibleSet}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 gap-6"
                        >
                            {features
                                .slice(visibleSet * featuresPerSet, (visibleSet + 1) * featuresPerSet)
                                .map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className={`flex items-start gap-4 p-5 rounded-xl shadow-md border border-white/20 bg-white/10 backdrop-blur-md transition-all ${getCardColor(index)}`}
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-md font-bold mb-1">{feature.text}</h4>
                                            <p className="text-sm leading-relaxed group-hover:text-inherit">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;




