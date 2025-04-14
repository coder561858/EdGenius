import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Damanpreet Kaur",
    role: "Frontend Developer",
    bio: "Passionate about creating beautiful and user-friendly interfaces. Specializes in React and modern web technologies.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Deepak Sharma",
    role: "UI/UX Designer",
    bio: "Designs elegant and intuitive user experiences to boost user engagement and satisfaction.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Ekagamjot Singh",
    role: "Frontend Developer",
    bio: "Focused on creating responsive and interactive web applications. Loves to experiment with new technologies.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Aadi Malik",
    role: "Backend Developer",
    bio: "Expert in backend development and database management. Focuses on creating scalable and efficient solutions.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Divyam",
    role: "Backend Developer",
    bio: "Focused on backend development and creating efficient solutions.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Team = () => {
  return (
    <motion.section
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-6 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)",
            "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Meet the LearnChain Team
          </h2>
          <p className="mt-4 text-gray-300">
            A passionate team shaping the future of decentralized learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-80 hover:shadow-2xl transition"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-center">
                <motion.h3
                  className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name}
                </motion.h3>
                <p className="mt-1 text-blue-400">{member.role}</p>
                <p className="mt-3 text-gray-400">{member.bio}</p>

                <div className="mt-5 flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, link]) => (
                    <motion.a
                      key={platform}
                      href={link}
                      className="text-gray-400 hover:text-blue-500 transition"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className={`fab fa-${platform} text-xl`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-16" variants={itemVariants}>
          <p className="text-gray-400 italic">
            United by vision, driven by innovation. Together, we’re decentralizing education.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Team;
