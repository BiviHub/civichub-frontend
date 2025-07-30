import { useState } from 'react';
import { Mail, Lock, UserPlus, Phone, MapPin, User, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/authService';
import { AxiosError } from 'axios';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await registerAdmin(formData);
            alert('Admin registered successfully!');
            navigate('/login');
        } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response?.data) {
                const data = axiosError.response.data;
                if (typeof data === 'string') {
                    setError(data);
                } else if (typeof data === 'object' && 'errors' in data) {
                    const errors = data.errors as Record<string, string[]>;
                    const messages = Object.values(errors).flat().join('\n');
                    setError(messages);
                } else {
                    setError('Registration failed. Please try again.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
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
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Admin Registration</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Register to manage users and civic operations.
                </p>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField icon={<User />} name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    <InputField icon={<User />} name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    <InputField icon={<Mail />} name="email" placeholder="Email" value={formData.email} onChange={handleChange} type="email" />
                    <InputField icon={<Phone />} name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />

                    {/* Gender dropdown styled to match input fields */}
                    <div className="relative">
                        <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="appearance-none pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <InputField icon={<MapPin />} name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                    <InputField icon={<Lock />} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} type="password" />
                    <InputField icon={<Lock />} name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} type="password" />

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

const InputField = ({
                        icon,
                        name,
                        placeholder,
                        value,
                        onChange,
                        type = 'text',
                    }: {
    icon: React.ReactNode;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
    </div>
);





