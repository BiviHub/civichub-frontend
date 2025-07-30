import { useState, useEffect } from 'react';
import { resetPassword } from '../services/authService';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') ?? '';
    const token = searchParams.get('token') ?? '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!email || !token) {
            setMessage('Invalid password reset link.');
        }
    }, [email, token]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        }
    }, [isSuccess, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsSuccess(false);

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            await resetPassword({ email, token, newPassword, confirmPassword });
            setMessage('Password reset successfully! Redirecting to login...');
            setIsSuccess(true);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setMessage(err.response.data.error);
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
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
                        <RotateCcw className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Reset Your Password</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Enter a new password to continue.
                </p>

                {message && (
                    <div className={`text-center mb-4 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email || !token}
                        className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
                </p>
            </motion.div>
        </div>
    );
}




