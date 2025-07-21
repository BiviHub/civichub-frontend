import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Users,
    HeartHandshake,
    Wrench,
    Leaf,
    Droplets,
    Shield,
    PencilLine,
    Send,
} from "lucide-react";
import { motion } from "framer-motion";

const suite = [
    {
        icon: <PencilLine className="w-7 h-7 text-blue-500" />,
        title: "Create Reports",
        desc: "Share issues or updates with your community including text, images, or videos.",
        bg: "bg-blue-50",
    },
    {
        icon: <Send className="w-7 h-7 text-green-500" />,
        title: "Post & React",
        desc: "Post reports instantly and let others react or leave supportive comments.",
        bg: "bg-green-50",
    },
    {
        icon: <HeartHandshake className="w-7 h-7 text-purple-500" />,
        title: "Community Connection",
        desc: "Join a growing network of engaged citizens making real change.",
        bg: "bg-purple-50",
    },
    {
        icon: <Users className="w-7 h-7 text-yellow-500" />,
        title: "User Dashboard",
        desc: "View your activity, manage your reports, and customize your profile.",
        bg: "bg-yellow-50",
    },
];

const trendingTopics = [
    {
        icon: <Wrench className="w-7 h-7 text-blue-500" />,
        text: "Road Repair Requests",
        bg: "bg-blue-50",
        border: "border-blue-200",
    },
    {
        icon: <Leaf className="w-7 h-7 text-green-500" />,
        text: "Community Clean-Up Drives",
        bg: "bg-green-50",
        border: "border-green-200",
    },
    {
        icon: <Droplets className="w-7 h-7 text-purple-500" />,
        text: "Water Supply Issues",
        bg: "bg-purple-50",
        border: "border-purple-200",
    },
    {
        icon: <Shield className="w-7 h-7 text-yellow-500" />,
        text: "Neighborhood Watch Alerts",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
    },
];

const AboutPage: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 flex flex-col md:flex-row items-center justify-center gap-12 bg-gradient-to-r from-blue-600/80 to-green-600/80 overflow-hidden">
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/Videos/civichub-video-poster.jpg"
            >
                <source src="/Videos/civichub-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-blue-900/60 z-10" />
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-30 w-full md:w-1/2 text-center md:text-left px-6"
            >
                <motion.h1
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
                >
                    Connect. Report. Empower.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-xl text-white/90 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
                >
                    CivicHub makes your voice count — share community issues, engage with others, and take action all from one place.
                </motion.p>
                <motion.a
                    href="/get-started"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-100 transition-transform"
                >
                    Start Reporting
                </motion.a>
            </motion.div>
        </section>

        {/* Trending Topics Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-12"
                >
                    Trending Topics
                </motion.h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingTopics.map((topic, i) => (
                        <motion.div
                            key={topic.text}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                            className={`group flex flex-col items-center p-6 rounded-2xl border ${topic.border} ${topic.bg} shadow-sm hover:shadow-lg transition`}
                        >
                            <div className="bg-white rounded-full p-4 shadow-md mb-4 group-hover:scale-110 transition-transform">
                                {topic.icon}
                            </div>
                            <span className="text-center text-lg font-semibold text-gray-700">
                                {topic.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>




        {/* Suite Features Section */}
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-12"
                >
                    What CivicHub Offers
                </motion.h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {suite.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                            className={`flex items-start p-6 rounded-2xl ${item.bg} shadow-sm hover:shadow-md transition`}
                        >
                            <div className="mr-4 mt-1">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-600 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>


        {/* Mission Statement Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-6"
                >
                    Our Mission
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-lg text-gray-700 leading-relaxed"
                >
                    At CivicHub, our mission is to empower everyday citizens to report, respond, and resolve issues within their
                    communities. We believe in transparency, community-driven change, and giving everyone a voice in shaping a better
                    future.
                </motion.p>
            </div>
        </section>



        <Footer />
    </div>
);

export default AboutPage;
