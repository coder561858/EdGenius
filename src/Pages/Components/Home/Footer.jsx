import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
    const [currentTime, setCurrentTime] = useState("2025-03-25 16:13:08");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    const socialIconVariants = {
        hover: {
            scale: 1.2,
            rotate: 360,
            transition: { type: "spring", stiffness: 300, damping: 10 },
        },
    };

    const pulseVariants = {
        initial: { scale: 1 },
        pulse: {
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        },
    };

    const floatingVariants = {
        initial: { y: 0 },
        float: {
            y: [-5, 5, -5],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        },
    };

    return (
        <motion.footer
            className="bg-gray-950 text-white relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Subtle moving gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-teal-900/10"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* LearnChain Brand */}
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <motion.h3
                            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text"
                            animate={{
                                textShadow: ["0 0 0px #06b6d4", "0 0 20px #06b6d4", "0 0 0px #06b6d4"],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            LearnChain
                        </motion.h3>
                        <p className="text-gray-400">
                            Empowering learners through blockchain credentials, on-chain quizzes, and real rewards.
                        </p>
                        <div className="flex space-x-4">
                            {["facebook", "twitter", "github", "linkedin"].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    className="text-gray-400 hover:text-cyan-400 transition"
                                    variants={socialIconVariants}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {/* Placeholder for icons */}
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {["Home", "Quizzes", "Credentials", "Contact"].map((link) => (
                                <motion.li key={link} whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {["Docs", "FAQs", "Whitepaper", "Support"].map((item) => (
                                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* User & Time */}
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <motion.div
                            className="bg-gray-800 p-4 rounded-lg backdrop-blur-sm bg-opacity-50"
                            variants={floatingVariants}
                            initial="initial"
                            animate="float"
                        >
                            <h4 className="text-lg font-semibold text-cyan-400 mb-2">Current User</h4>
                            <motion.p
                                className="text-gray-400"
                                variants={pulseVariants}
                                initial="initial"
                                animate="pulse"
                            >
                                @damanpreetkaur17
                            </motion.p>
                        </motion.div>
                        <motion.div
                            className="bg-gray-800 p-4 rounded-lg backdrop-blur-sm bg-opacity-50"
                            variants={floatingVariants}
                            initial="initial"
                            animate="float"
                        >
                            <h4 className="text-lg font-semibold text-cyan-400 mb-2">UTC Time</h4>
                            <motion.p
                                className="text-gray-400"
                                variants={pulseVariants}
                                initial="initial"
                                animate="pulse"
                            >
                                {currentTime}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div className="border-t border-gray-800 pt-8" variants={itemVariants}>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <motion.div className="text-gray-400 text-sm" whileHover={{ scale: 1.02 }}>
                            © 2025 LearnChain. Learn, Earn, and Onboard to Web3.
                        </motion.div>
                        <div className="flex space-x-6">
                            {["Privacy", "Terms", "Cookies"].map((policy) => (
                                <motion.a
                                    key={policy}
                                    href="#"
                                    className="text-gray-400 hover:text-cyan-400 transition text-sm"
                                    whileHover={{ y: -2 }}
                                >
                                    {policy}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
