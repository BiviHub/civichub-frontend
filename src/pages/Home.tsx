import { Shield, Users, Clock, CheckCircle, ArrowRight, MessageSquare,  Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const features = [
        {
            icon: MessageSquare,
            title: "Easy Reporting",
            description: "Report civic issues quickly with our intuitive interface and photo uploads."
        },
        {
            icon: Clock,
            title: "Real-time Tracking",
            description: "Track the progress of your complaints from submission to resolution."
        },
        {
            icon: Users,
            title: "Community Driven",
            description: "Connect with your community and stay informed about local issues."
        },
        {
            icon: CheckCircle,
            title: "Quick Resolution",
            description: "Efficient workflow ensures faster resolution of civic problems."
        }
    ];

    const services = [
        { name: "Road Maintenance", icon: "🛣️" },
        { name: "Waste Management", icon: "🗑️" },
        { name: "Water Supply", icon: "💧" },
        { name: "Street Lighting", icon: "💡" },
        { name: "Public Safety", icon: "🚨" },
        { name: "Parks & Recreation", icon: "🌳" }
    ];

    const stats = [
        { number: "5,000+", label: "Issues Resolved" },
        { number: "15,000+", label: "Active Citizens" },
        { number: "98%", label: "Satisfaction Rate" },
        { number: "24hrs", label: "Avg Response Time" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                CivicHub
              </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Your voice matters. Report civic issues, track progress, and help build a better community.
                            Connect directly with local authorities for faster resolution of public concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 h-11 px-8 py-3">
                                    Get Started
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-11 px-8 py-3">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose CivicHub?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the future of civic engagement with our comprehensive platform designed for citizens and authorities.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md rounded-lg bg-white p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <feature.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Report issues across various civic services and help improve your community.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Simple steps to report and track civic issues in your community.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Report Issue</h3>
                            <p className="text-gray-600">
                                Create an account and report civic issues with photos and detailed descriptions.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
                            <p className="text-gray-600">
                                Monitor the status of your complaint as it moves through the resolution process.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Resolution</h3>
                            <p className="text-gray-600">
                                Receive updates and confirmation when your issue has been resolved.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What Citizens Say
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Local Resident",
                                content: "CivicHub made it so easy to report a pothole on my street. It was fixed within a week!"
                            },
                            {
                                name: "Mike Chen",
                                role: "Business Owner",
                                content: "The transparency and tracking features are excellent. I always know the status of my reports."
                            },
                            {
                                name: "Emily Davis",
                                role: "Community Leader",
                                content: "This platform has transformed how our community communicates with local authorities."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="rounded-lg bg-white shadow-md p-6">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
