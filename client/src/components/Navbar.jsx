import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            <div className="relative px-6 lg:px-20 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 2C7.45 2 7 2.45 7 3V4H6C5.45 4 5 4.45 5 5V6C5 6.55 5.45 7 6 7H7V8C7 8.55 7.45 9 8 9H16C16.55 9 17 8.55 17 8V7H18C18.55 7 19 6.55 19 6V5C19 4.45 18.55 4 18 4H17V3C17 2.45 16.55 2 16 2H8ZM8 4H16V6H8V4ZM7 9V20C7 21.1 7.9 22 9 22H15C16.1 22 17 21.1 17 20V9H15V20H9V9H7Z"/>
                                        <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
                                        <path d="M10 12H14V13H10V12Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">
                                    Ink Diaries
                                </h1>
                                <p className="text-blue-100 text-xs font-medium">
                                    Share Your Story
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {[
                            { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                            { to: "/add", label: "Write", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
                            { to: "/favorites", label: "Favorites", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                            { to: "/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
                        ].map((item) => (
                            <motion.div
                                key={item.to}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <Link
                                    to={item.to}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/login"
                                    className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Sign In
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* User Avatar */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-medium hidden sm:block">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </span>
                                </div>

                                {/* Logout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Border Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        </motion.nav>
    );
}