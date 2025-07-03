import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Users, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [userType, setUserType] = useState('citizen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userTypes = [
        { id: 'citizen', label: 'Citizen', icon: Users, description: 'Report and track civic issues' },
        { id: 'admin', label: 'admin', icon: Shield, description: 'manage users, issues, and complaints' },
        { id: 'worker', label: 'Field Worker', icon: CheckCircle, description: 'Handle assigned tasks' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just redirect to appropriate dashboard based on user type
        if (userType === 'citizen') {
            window.location.href = '/citizen-dashboard';
        } else if (userType === 'admin') {
            window.location.href = '/admin-dashboard';
        } else if (userType === 'worker') {
            window.location.href = '/worker-dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-20">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Sign in to your CivicHub account</p>
                        </div>

                        {/* User Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                I am a:
                            </label>
                            <div className="space-y-3">
                                {userTypes.map((type) => (
                                    <label key={type.id} className="relative">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value={type.id}
                                            checked={userType === type.id}
                                            onChange={(e) => setUserType(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            userType === type.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <div className="flex items-center space-x-3">
                                                <type.icon className={`w-5 h-5 ${
                                                    userType === type.id ? 'text-blue-600' : 'text-gray-400'
                                                }`} />
                                                <div>
                                                    <div className={`font-medium ${
                                                        userType === type.id ? 'text-blue-900' : 'text-gray-900'
                                                    }`}>
                                                        {type.label}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {type.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-colors focus:ring-4 focus:ring-blue-200"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;