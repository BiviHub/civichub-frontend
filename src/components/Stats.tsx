import { useRef } from "react";
import { useInView } from "framer-motion";
import { stats } from "../constants";
import { useStatsCounters } from "../hooks/useStatsCounters";

const Stats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const counts = useStatsCounters(stats, isInView);

    return (
        <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Impact in Numbers</h2>
                    <p className="text-gray-600 text-lg">CivicHub is transforming how communities solve problems.</p>
                </div>

                <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => {
                        const rawValue = counts[index];
                        const formatted = stat.number.includes("%")
                            ? `${rawValue}%`
                            : stat.number.includes("+")
                                ? `${rawValue.toLocaleString()}+`
                                : rawValue;

                        return (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300">
                                <div className="text-4xl font-extrabold text-blue-600 mb-2">{formatted}</div>
                                <div className="text-gray-700 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;



