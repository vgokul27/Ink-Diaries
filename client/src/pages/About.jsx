import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Ink Diaries
        </h1>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Your Digital Journal
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Ink Diaries is a modern blogging platform designed to capture your thoughts, 
            experiences, and stories in a beautiful, intuitive interface. Whether you're 
            documenting daily life, sharing insights, or crafting creative narratives, 
            our platform provides the perfect space for your digital ink to flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ✨ Features
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Create and publish beautiful blog posts</li>
              <li>• Add images to enhance your stories</li>
              <li>• Save your favorite posts for later</li>
              <li>• Secure authentication with Firebase</li>
              <li>• Responsive design for all devices</li>
              <li>• Smooth animations and modern UI</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎯 Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To provide a simple, elegant platform where writers can focus on 
              what matters most - their content. We believe everyone has a story 
              to tell, and we're here to help you tell it beautifully.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Start Your Journey
          </h3>
          <p className="text-gray-700 mb-6">
            Ready to begin documenting your thoughts and experiences? 
            Join our community of writers and start sharing your stories today.
          </p>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="/add"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Write Your First Post
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Explore Posts
            </motion.a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Built with ❤️ using React, Tailwind CSS, and Firebase
          </p>
        </div>
      </div>
    </motion.div>
  );
}
