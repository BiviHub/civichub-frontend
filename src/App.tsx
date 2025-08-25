
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from './Context/ThemeProvider';
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from './pages/admin/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NewsFeed from './pages/User/NewsFeed';
import Profile from './pages/User/Profile';
import Settings from './pages/User/Settings'; // Coming next
import MyPosts from './pages/User/MyPosts';
import AdminRegister from './pages/AdminRegister';
import TwoFactorSettings from './pages/TwoFactorSettings';
import FlaggedPosts from "./pages/admin/FlaggedPosts.tsx";
import ManageReports from './pages/admin/ManageReports';
import AllUsers from './pages/admin/AllUsers';
import ContentManagement from './pages/admin/ContentManagement';
import Announcements from './pages/admin/Announcements';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';

import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import UserLayout from "./components/Layout/UserLayout.tsx";
import ReportIssuePage from "./pages/User/ReportIssuePage";


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider> {/* Provides dark mode globally */}
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50 flex flex-col">

                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path={"/admin-register"} element={<AdminRegister />} /> {/* ✅ Admin Route */}
                            <Route path="/two-factor-settings" element={<TwoFactorSettings />} />
                            <Route path="/AboutPage" element={<AboutPage />} />
                            <Route path="/ContactPage" element={<ContactPage />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />

                            <Route path="/admin/users" element={<AllUsers />} />
                            <Route path="/my-posts" element={<MyPosts />} />
                            {/* Authenticated Routes (Simulated for now) */}



                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/reports" element={<ManageReports />} />
                            <Route path="/admin/flagged" element={<FlaggedPosts />} />
                            <Route path="/pages/about" element={<AboutPage />} />
                            <Route path="/pages/contact" element={<ContactPage />} />
                            <Route path="/admin/content" element={<ContentManagement />} />
                            <Route path="/admin/announcements" element={<Announcements />} />
                            <Route path="/admin/analytics" element={<Analytics />} />
                            <Route path="/admin/settings" element={<AdminSettings />} />
                            <Route path="/admin/profile" element={<AdminProfile />} />
                            {/* User Routes Nested under UserLayout */}
                            <Route path="/user" element={<UserLayout />}>
                                <Route path="news" element={<NewsFeed />} />
                                <Route path="posts" element={<MyPosts />} />
                                <Route path="settings" element={<Settings />} />

                                <Route path="profile" element={<Profile />} />
                                <Route path="report" element={<ReportIssuePage />} />{/* <-- new page */}

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

