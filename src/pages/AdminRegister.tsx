import { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // 🛠️ Backend will later assign admin role
        console.log('Admin Registration:', formData);

        // Temporary: redirect to login
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <motion.div
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Admin Registration</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Register to manage users and civic operations.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Admin email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-md font-semibold hover:opacity-90 transition"
                    >
                        Register as Admin
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already registered?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default AdminRegister;
