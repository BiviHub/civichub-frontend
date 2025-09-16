import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";
import { useProfile } from "../../Context/ProfileContext"; // Import context

const UserNavbar = () => {
    const [firstName, setFirstName] = useState<string>("Guest");
    const { profile } = useProfile(); // Use context

    // Sync firstName with context profile
    useEffect(() => {
        if (profile && profile.firstName) {
            setFirstName(profile.firstName);
        }
    }, [profile]);

    // Fetch profile as fallback
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Navbar Token from localStorage:", token ? `${token.substring(0, 10)}...` : "null");
                if (!token) {
                    setFirstName("Guest");
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Error",
                        text: "No token found. Please log in again.",
                        timer: 3000,
                    });
                    return;
                }
                console.log("Navbar Fetching GET /Account/profile");
                const response = await api.get("/Account/profile");
                console.log("Navbar Profile data:", response.data);
                const fullName = response.data.fullName?.trim() || "";
                const firstNameFromData = response.data.firstName || (fullName.split(" ").filter(Boolean)[0] || "Guest");
                console.log("Parsed firstName:", firstNameFromData);
                setFirstName(firstNameFromData);
            } catch (err: any) {
                console.error("Navbar Profile fetch error:", {
                    status: err.response?.status,
                    response: err.response?.data,
                    message: err.message,
                });
                setFirstName("Guest");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        err.response?.status === 401
                            ? "Please log in again."
                            : err.response?.data?.message || "Failed to load user profile.",
                    timer: 3000,
                });
            }
        };
        if (!profile) {
            fetchProfile(); // Fetch only if context profile is not yet available
        }
    }, [profile]);

    return (
        <div className="sticky top-0 w-full z-30 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow-md transition-colors">
            <div className="flex items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CivicHub
          </span>
                </Link>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-medium dark:text-gray-300">Welcome, {firstName}</span>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;