import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-6 px-6 mt-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white text-sm">
          © 2025 Ink Diaries - All rights reserved
        </p>
      </div>
    </motion.footer>
  );
}
