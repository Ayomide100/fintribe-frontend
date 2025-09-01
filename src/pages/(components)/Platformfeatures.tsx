import React from "react";
import { LuSparkles } from "react-icons/lu";
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Search,
  ChartNoAxesCombined,
} from "lucide-react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="text-[#226B44]" size={24} />,
    title: "Vetted Opportunities",
    desc: "Every investment opportunity is thoroughly vetted by our expert team before being listed on the platform.",
  },
  {
    icon: <Users className="text-[#226B44]" size={24} />,
    title: "Investment Circles",
    desc: "Join exclusive investment groups led by verified gurus and connect with like-minded investors.",
  },
  {
    icon: <GraduationCap className="text-[#226B44]" size={38} />,
    title: "Learning Hub",
    desc: "Access comprehensive educational content, webinars, and courses designed for Nigerian investors.",
  },
  {
    icon: <ChartNoAxesCombined className="text-[#226B44]" size={24} />,
    title: "Performance Tracking",
    desc: "Monitor guru performance, investment success rates, and community recommendations.",
  },
  {
    icon: <HiOutlineLightBulb className="text-[#226B44]" size={38} />,
    title: "Expert Insights",
    desc: "Get real-time market insights, investment tips, and commentary from verified financial experts.",
  },
  {
    icon: <Search className="text-[#226B44]" size={24} />,
    title: "Smart Discovery",
    desc: "Find investment opportunities tailored to your interests, risk tolerance, and investment goals.",
  },
];

const Platformfeatures = () => {
  return (
    <motion.div
      className="w-full bg-[#FAFBFB] py-12 sm:py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.2 }} // fade out when leaving viewport
    >
      {/* Header */}
      <motion.div
        className="flex justify-center items-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: false }}
      >
        <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#C8E4D6] gap-2 sm:gap-3 rounded-full flex justify-center items-center">
          <LuSparkles className="text-[#226B44]" size={18} />
          <p className="text-[#226B44] text-xs sm:text-sm font-medium">
            Platform Features
          </p>
        </div>
      </motion.div>

      {/* Title + Subtitle */}
      <motion.div
        className="text-center mb-8 sm:mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: false }}
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Everything You Need to{" "}
          <span className="text-[#226B44]">Invest Confidently</span>
        </p>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Our comprehensive platform combines social networking, education, and
          vetted opportunities to <br className="hidden sm:block" /> help you
          make informed investment decisions.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-6 relative">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className="p-4 sm:p-6 hover:shadow-md transition relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="mb-2 sm:mb-3">{item.icon}</div>
            <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">
              {item.title}
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>

            {/* Vertical dotted divider */}
            {(idx + 1) % 3 !== 0 && (
              <div className="absolute top-0 right-0 h-full border-r-4 border-dotted border-gray-300 hidden md:block"></div>
            )}

            {/* Horizontal dotted divider */}
            {idx < features.length - 3 && (
              <div className="absolute bottom-0 left-0 w-full border-b-4 border-dotted border-gray-300 hidden sm:block"></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom Text */}
      <motion.div
        className="flex justify-center mt-8 sm:mt-10 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          {/* Stars */}
          <div className="flex -space-x-2 mb-2 sm:mb-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-[#226B44] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                <FaStar />
              </div>
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-700 text-xs sm:text-sm sm:ml-2">
            <span className="text-[#226B44] font-bold">10,000+ investors</span>{" "}
            are already building wealth with FinTribe
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Platformfeatures;
