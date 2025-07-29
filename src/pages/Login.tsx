import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/authService';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


// Define type for the decoded token
interface DecodedToken {
    sub: string;
    role?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
    [key: string]: unknown;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login({ email, password });
            localStorage.setItem('token', result.token);

            const decoded = jwtDecode<DecodedToken>(result.token);
            const role =
                decoded.role ||
                decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role?.toLowerCase() === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/newsfeed');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data || 'Login failed.');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

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
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Login to continue reporting civic issues
                </p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                        <Link to="/register" className="text-gray-500 hover:underline">
                            New user?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md font-semibold hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;



