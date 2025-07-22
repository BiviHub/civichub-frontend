import { testimonials } from '../constants/index';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                    What People Are Saying
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="w-full sm:w-[45%] lg:w-[30%] bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Star Rating */}
                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 text-md italic mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-14 h-14 rounded-full object-cover border border-blue-500"
                                    src={testimonial.image}
                                    alt={testimonial.user}
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.user}</h4>
                                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

