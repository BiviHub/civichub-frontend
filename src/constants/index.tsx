import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import {    MapPin, Bell,  Camera, Users,  ShieldCheck,   } from "lucide-react";
import { ClipboardEdit, Loader, CheckCircle2 } from "lucide-react";



import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const stats = [
    { number: "5,000+", label: "Issues Resolved" },
    { number: "15,000+", label: "Active Citizens" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24hrs", label: "Avg Response Time" },
];


export const testimonials = [
    {
        user: "John Doe",
        company: "CivicHub User - Lagos",
        image: user1,
        text: "Reporting a broken streetlight took less than 2 minutes. The tracking feature gave me updates and it was fixed in 3 days!",
    },
    {
        user: "Jane Smith",
        company: "Business Owner, Abuja",
        image: user2,
        text: "CivicHub has completely changed how we interact with local authorities. It's fast, transparent, and very easy to use.",
    },
    {
        user: "David Johnson",
        company: "Resident, Port Harcourt",
        image: user3,
        text: "I used CivicHub to report road damage. Within 48 hours, the local team reached out. I’m impressed by the swift response!",
    },
    {
        user: "Ronee Brown",
        company: "Youth Leader, Enugu",
        image: user4,
        text: "CivicHub empowers our community to take action. We've reported and resolved 5 local issues in just 2 weeks.",
    },
    {
        user: "Michael Wilson",
        company: "Student, Jos",
        image: user5,
        text: "Before CivicHub, I didn’t know how to report public issues. Now I do it from my phone with ease. Highly recommend!",
    },
    {
        user: "Emily Davis",
        company: "Community Organizer, Kano",
        image: user6,
        text: "The app bridges the gap between citizens and local councils. It’s a game-changer for civic participation.",
    },
];

export const features = [
    {
        icon: <BotMessageSquare className="w-6 h-6 text-blue-600" />,
        text: "Smart Reporting",
        description: "Quickly report issues with automated prompts and smart suggestions.",
    },
    {
        icon: <Camera className="w-6 h-6 text-blue-600" />,
        text: "Photo Evidence",
        description: "Attach images or videos of issues to help authorities respond faster.",
    },
    {
        icon: <MapPin className="w-6 h-6 text-blue-600" />,
        text: "Geolocation Support",
        description: "Automatically tag your complaint location using your device's GPS.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
        text: "Verified Responses",
        description: "Only authorized government agents can update complaint statuses.",
    },
    {
        icon: <Bell className="w-6 h-6 text-blue-600" />,
        text: "Real-Time Notifications",
        description: "Stay updated every step of the way with SMS and in-app alerts.",
    },
    {
        icon: <Users className="w-6 h-6 text-blue-600" />,
        text: "Community Feedback",
        description: "See what others are reporting and support community concerns.",
    },
    {
        icon: <GlobeLock className="w-6 h-6 text-blue-600" />,
        text: "Secure Platform",
        description: "Your data and reports are protected with enterprise-level security.",
    },
    {
        icon: <BatteryCharging className="w-6 h-6 text-blue-600" />,
        text: "Fast Resolutions",
        description: "Complaints are routed efficiently to the correct departments for speedy resolutions.",
    },
];

export const services = [
    { name: "Road Maintenance", icon: "🛣️" },
    { name: "Waste Management", icon: "🗑️" },
    { name: "Water Supply", icon: "💧" },
    { name: "Street Lighting", icon: "💡" },
    { name: "Public Safety", icon: "🚨" },
    { name: "Parks & Recreation", icon: "🌳" },
];
export const steps = [
    {
        icon: ClipboardEdit,
        color: "blue",
        title: "Report Issue",
        description: "Create an account and report civic issues with photos and details.",
        bg: "bg-blue-100 group-hover:bg-blue-600",
    },
    {
        icon: Loader,
        color: "green",
        title: "Track Progress",
        description: "Monitor your complaint as it progresses to resolution.",
        bg: "bg-green-100 group-hover:bg-green-600",
    },
    {
        icon: CheckCircle2,
        color: "purple",
        title: "Get Resolution",
        description: "Receive confirmation when your issue is resolved.",
        bg: "bg-purple-100 group-hover:bg-purple-600",
    },
];


export const featuress = [
    {
        icon: <BotMessageSquare />,
        text: "Drag-and-Drop Interface",
        description:
            "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
    },
    {
        icon: <Fingerprint />,
        text: "Multi-Platform Compatibility",
        description:
            "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
    },
    {
        icon: <ShieldHalf />,
        text: "Built-in Templates",
        description:
            "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
    },
    {
        icon: <BatteryCharging />,
        text: "Real-Time Preview",
        description:
            "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
    },
    {
        icon: <PlugZap />,
        text: "Collaboration Tools",
        description:
            "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
    },
    {
        icon: <GlobeLock />,
        text: "Analytics Dashboard",
        description:
            "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
    },
];

export const checklistItems = [
    {
        title: "Code merge made easy",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "Review code without worry",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "AI Assistance to reduce time",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
    {
        title: "Share work in minutes",
        description:
            "Track the performance of your VR apps and gain insights into user behavior.",
    },
];

export const pricingOptions = [
    {
        title: "Free",
        price: "$0",
        features: [
            "Private board sharing",
            "5 Gb Storage",
            "Web Analytics",
            "Private Mode",
        ],
    },
    {
        title: "Pro",
        price: "$10",
        features: [
            "Private board sharing",
            "10 Gb Storage",
            "Web Analytics (Advance)",
            "Private Mode",
        ],
    },
    {
        title: "Enterprise",
        price: "$200",
        features: [
            "Private board sharing",
            "Unlimited Storage",
            "High Performance Network",
            "Private Mode",
        ],
    },
];

export const resourcesLinks = [
    { href: "#", text: "Getting Started" },
    { href: "#", text: "Documentation" },
    { href: "#", text: "Tutorials" },
    { href: "#", text: "API Reference" },
    { href: "#", text: "Community Forums" },
];

export const platformLinks = [
    { href: "#", text: "Features" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
];

export const communityLinks = [
    { href: "#", text: "Events" },
    { href: "#", text: "Meetups" },
    { href: "#", text: "Conferences" },
    { href: "#", text: "Hackathons" },
    { href: "#", text: "Jobs" },
];
