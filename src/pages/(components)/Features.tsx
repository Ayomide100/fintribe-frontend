import React from "react";
import { Compass, School, Star } from "lucide-react";
import { motion } from "framer-motion";

const investmentData = [
  {
    title: "Lagos Real Estate",
    subtitle: "Sterling Properties",
    category: "Real Estate",
    categoryColor: "bg-cyan-100 text-cyan-600",
    rating: 4.6,
    investors: 234,
    roi: "18-22%",
    duration: "24 months",
    minInvestment: "₦250,000",
    riskLevel: "Low Risk",
    riskColor: "bg-green-100 text-green-600",
  },
  {
    title: "AgroFund",
    subtitle: "AgriGrowth Ltd",
    category: "Agriculture",
    categoryColor: "bg-emerald-100 text-emerald-600",
    rating: 4.8,
    investors: 734,
    roi: "35-50%",
    duration: "12 months",
    minInvestment: "₦150,000",
    riskLevel: "Medium Risk",
    riskColor: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Lagos Real Estate",
    category: "Agriculture",
    subtitle: "AgriGrowth Ltd",
    categoryColor: "bg-emerald-100 text-emerald-600",
    rating: 4.8,
    investors: 234,
    roi: "35-50%",
    duration: "24 months",
    minInvestment: "₦250,000",
    riskLevel: "High Risk",
    riskColor: "bg-red-100 text-red-600",
  },
  {
    title: "Lagos Real Estate",
    category: "Technology",
    subtitle: "Tech Innovators",
    categoryColor: "bg-blue-100 text-blue-600",
    rating: 4.8,
    investors: 234,
    roi: "25-30%",
    duration: "24 months",
    minInvestment: "₦250,000",
    riskLevel: "Medium Risk",
    riskColor: "bg-orange-100 text-orange-600",
  },
];

interface Investment {
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  rating: number;
  investors: number;
  roi: string;
  duration: string;
  minInvestment: string;
  riskLevel: string;
  riskColor: string;
}

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition duration-200 w-[80%] sm:w-[60%] md:w-auto flex-shrink-0"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{investment.title}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <School className="w-4 h-4" />
            <span>{investment.subtitle}</span>
          </div>
        </div>
        <span
          className={`text-[10px] md:text-xs px-3 py-1 rounded-full font-medium ${investment.categoryColor}`}
        >
          {investment.category}
        </span>
      </div>

      {/* ROI & Duration */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-green-700">{investment.roi}</p>
          <p className="text-xs text-gray-500">Expected ROI</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">
            {investment.duration}
          </p>
          <p className="text-xs text-gray-500">Duration</p>
        </div>
      </div>

      {/* Risk + Rating */}
      <div className="w-full flex justify-between mb-4 items-center">
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{investment.rating}</span>
          <span className="text-gray-500">
            ({investment.investors} investors)
          </span>
        </div>
        <div
          className={`inline-block px-3 py-1 text-center rounded-full md:text-xs text-[9px] font-medium ${investment.riskColor}`}
        >
          {investment.riskLevel}
        </div>
      </div>

      {/* Min Investment */}
      <p className="text-sm mb-4">
        <span className="text-gray-500">Min. Investment: </span>
        <span className="font-semibold">{investment.minInvestment}</span>
      </p>

      {/* Button */}
      <button className="w-full bg-[#0A2540] text-white py-2 md:py-3 text-sm rounded-lg font-medium hover:bg-[#1a3b5c] transition flex items-center justify-center gap-2">
        Join FinTribe Today →
      </button>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="w-full bg-white py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full flex justify-between items-center px-4 md:px-6 mb-8"
      >
        <div>
          <p className="text-sm font-medium">Featured Opportunities</p>
          <p className="font-semibold md:text-2xl text-xl text-[#2E8B57]">
            Vetted Investment Opportunities
          </p>
          <p className="text-sm text-[#6E6E6E]">
            Discover carefully selected investment opportunities from verified
            partners with transparent returns and risk assessments.
          </p>
        </div>
        <div className="hidden md:flex">
          <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-4 rounded flex items-center gap-2">
            View all <Compass className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Cards Section */}
      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden overflow-x-auto gap-4 px-4 scrollbar-hide">
        {investmentData.map((investment, i) => (
          <InvestmentCard key={i} investment={investment} />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-6">
        {investmentData.map((investment, i) => (
          <InvestmentCard key={i} investment={investment} />
        ))}
      </div>

      <div className="flex md:hidden w-full h-[2rem] mt-7 justify-center items-center">
        <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-28 rounded-2xl flex items-center gap-2">
          View all <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Features;
