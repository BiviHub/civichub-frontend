import {   ArrowRight,    } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Testimonials from "../components/Testimonials.tsx";
import Hero from "../components/Hero.tsx";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks.tsx";


const Home = () => {



    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <Hero />

            {/* Stats Section */}
            <Stats />

            {/* Features Section */}
            <Features />

            {/* Services Section */}
            <Services />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Testimonials Section */}

            <Testimonials />
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of citizens who are already using CivicHub to improve their communities.
                    </p>
                    <Link to="/login">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-blue-600 hover:bg-gray-100 h-11 px-8 py-3">
                            Start Reporting Issues Today
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
