import { steps } from "../constants";
import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Simple steps to report and track civic issues in your community.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.03] group"
                        >
                            {/* Icon circle */}
                            <div
                                className={`w-16 h-16 ${step.bg} transition-colors duration-300 rounded-full flex items-center justify-center mx-auto mb-6`}
                            >
                                <step.icon className={`w-10 h-10 text-${step.color}-600 group-hover:text-white transition-colors`} />
                            </div>

                            {/* Title & Text */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 text-base">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;


