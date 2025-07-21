import { Mail, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
            <motion.div
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <KeyRound className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Forgot Password?</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Enter your email and we'll send you a reset link.
                </p>

                <form>
                    <div className="mb-6">
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md font-semibold hover:opacity-90 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
