import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from './Context/ThemeContext'; // Provides dark mode globally
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from './pages/admin/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminRegister from './pages/AdminRegister';
import TwoFactorSettings from './pages/TwoFactorSettings';
import FlaggedPosts from "./pages/admin/FlaggedPosts";
import ManageReports from './pages/admin/ManageReports';
import Users from './pages/admin/Users';
import ContentManagement from './pages/admin/ContentManagement';
import Announcements from './pages/admin/Announcements';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserLayout from './components/Layout/UserLayout';
import NewsFeed from './pages/User/NewsFeed';
import Profile from './pages/User/Profile';
import Settings from './pages/User/Settings';
import MyPosts from './pages/User/MyPosts';
import Notification from "./pages/User/Notification";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider> {/* Provides dark mode globally */}
            <BrowserRouter>
                <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 dark:from-gray-900 dark:to-gray-800 flex flex-col">

                <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin-register" element={<AdminRegister />} />
                            <Route path="/two-factor-settings" element={<TwoFactorSettings />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/reports" element={<ManageReports />} />
                            <Route path="/admin/flagged" element={<FlaggedPosts />} />
                            <Route path="/admin/users" element={<Users />} />
                            <Route path="/pages/about" element={<AboutPage />} />
                            <Route path="/pages/contact" element={<ContactPage />} />
                            <Route path="/admin/content" element={<ContentManagement />} />
                            <Route path="/admin/announcements" element={<Announcements />} />
                            <Route path="/admin/analytics" element={<Analytics />} />
                            <Route path="/admin/settings" element={<AdminSettings />} />
                            <Route path="/admin/profile" element={<AdminProfile />} />

                            {/* User Routes */}
                            <Route path="/user/*" element={<UserLayout />}>
                                <Route path="news" element={<NewsFeed />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="posts" element={<MyPosts />} />
                                <Route path="notification" element={<Notification />} />
                            </Route>

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;