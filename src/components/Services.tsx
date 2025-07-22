import { services } from "../constants/index";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};


const Services = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    className="text-4xl font-extrabold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Our Services
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    We help connect communities with essential civic services. Here’s what we cover:
                </motion.p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            variants={cardVariants}
                            viewport={{ once: true }}
                            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-[1.05] hover:bg-blue-50 hover:border-blue-200 border border-transparent"
                        >
                            <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125">
                                {service.icon}
                            </div>
                            <h5 className="text-gray-800 font-semibold text-lg group-hover:text-blue-600">
                                {service.name}
                            </h5>
                        </motion.div>
                    ))}
                </div>

                {/* Optional Call-to-Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <p className="text-blue-700 font-medium">
                        More services are added regularly based on your community needs.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;

