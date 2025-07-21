import { useState, useEffect, useRef } from 'react';
import {
    User,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    onToggle?: (expanded: boolean) => void;
}

const Sidebar = ({ onToggle }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        onToggle?.(isExpanded);
    }, [isExpanded]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                window.innerWidth >= 768 &&
                isExpanded
            ) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    const links = [
        { to: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
        { to: '/my-posts', label: 'My Posts', icon: <FileText className="w-5 h-5" /> },
        { to: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
        { to: '/logout', label: 'Logout', icon: <LogOut className="w-5 h-5" />, danger: true },
    ];

    return (
        <>
            {/* Mobile toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5 text-blue-600" />}
            </button>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 overflow-hidden
        bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${isExpanded ? 'w-64' : 'w-16'}
      `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
                    <div className="font-bold text-lg">{isExpanded ? 'CivicHub' : 'CH'}</div>
                    <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="hidden md:flex items-center justify-center p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>

                {/* Links */}
                <ul className="mt-6 px-2 space-y-2">
                    {links.map(({ to, label, icon, danger }) => {
                        const isActive = location.pathname === to;
                        return (
                            <li key={to}>
                                <Link
                                    to={to}
                                    title={!isExpanded ? label : ''}
                                    className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all
                  ${isActive ? 'bg-white/30 font-semibold' : 'hover:bg-white/20'}
                  ${danger ? 'text-red-200 hover:bg-red-500/30' : 'text-white'}
                `}
                                >
                                    <span className="transition-transform group-hover:scale-110">{icon}</span>
                                    {isExpanded && <span className="truncate">{label}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;


