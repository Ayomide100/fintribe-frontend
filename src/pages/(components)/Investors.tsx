/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import Image from "next/image";
import { TbLockAccess } from "react-icons/tb";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// images
// import firstone from "../../../assets/187817fe37210c2e0093099c360898510851d788.jpg";
// import secondone from "../../../assets/2e1363bd7bba50ad27e636dd5baf25554019cbc6.jpg";
// import thirdone from "../../../assets/b05c727f512f42114b5172a761b9bec8cb0ddab0.jpg";
// import fourthone from "../../../assets/fa3ade4848a2f80ff7721bbdbe3f2d9fe32d2b66.jpg";

// import firstavatar from "../../../assets/415d4678cf8060fd7cd2737b18c9f1d6805aea67.jpg";
// import secondavatar from "../../../assets/96befc06bcc1cfd2e6a85064de0253f03354026a.jpg";
// import thirdavatar from "../../../assets/a2c6e6d0de7c64b0e95e9bf35274ad5bae26def3.jpg";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

// const circles = [
//   {
//     title: "Young NG Investors circle",
//     members: "300",
//     desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
//     tags: ["Real Estate", "Bonds", "Stocks"],
//     images: [firstone, secondone, thirdone, fourthone],
//     avatar: firstavatar,
//   },
//   {
//     title: "Young NG Investors circle",
//     members: "300",
//     desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
//     tags: ["Real Estate", "Bonds", "Stocks"],
//     images: [firstone, secondone, thirdone, fourthone],
//     avatar: secondavatar,
//   },
//   {
//     title: "Young NG Investors circle",
//     members: "300",
//     desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
//     tags: ["Real Estate", "Bonds", "Stocks"],
//     images: [firstone, secondone, thirdone, fourthone],
//     avatar: thirdavatar,
//   },
// ];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const InvestorCard = ({ circle }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition 
      min-w-[80%] sm:min-w-[280px] md:w-[340px] md:h-[360px]"
    >
      {/* Circle Icon */}
      <div className="w-full h-[40%] flex justify-center items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#2E8B57]">
          <Image
            src={circle.icon?.url || "/fallback.png"} // fallback if missing
            alt={circle.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Text Info */}
      <div className="w-full flex justify-center items-center flex-col">
        <h3 className="font-semibold text-gray-900 mb-1 text-center">
          {circle.name}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2 gap-1">
          <span>{circle.totalMembers} members</span>
          {circle.type === "private" && (
            <TbLockAccess className="text-[#2E8B57]" size={18} />
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
          {circle.description}
        </p>

        {/* Top Members */}
        <div className="flex justify-center items-center -space-x-3 mb-4">
          {circle.topMembers?.map((member: any, i: number) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E8B57]"
            >
              <Image
                src={member.avatar?.url || "/avatar-fallback.png"}
                alt={member.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {/* Remaining Members (if you want) */}
          {circle.remainingCount > 0 && (
            <div className="w-10 h-10 rounded-full bg-[#0A2540] flex items-center justify-center text-xs font-medium text-white border-2 border-white">
              +{circle.remainingCount}
            </div>
          )}
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition text-sm">
        Join Circle →
      </button>
    </motion.div>
  );
};

const Investors = () => {
  const [circles, setcirles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const displayedCircles = showAll ? circles : circles.slice(0, 3);

  useEffect(() => {
    const getallCircles = async () => {
      try {
        const response = await axios.get("/circle/?pages=1&limit=6");
        console.log(response.data.content.circles || []);
        setcirles(response.data.content.circles || []);
      } catch (error) {
        if (isAxiosError(error)) {
          const msg =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch experts";
          toast.error(msg);
        }
      }
    };

    getallCircles();
  }, []);

  return (
    <div className="w-full bg-white py-12">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 md:px-8 mb-8">
        <div className="px-2 md:w-[46%] w-[90%]">
          <p className="text-sm font-medium">Investment Circles</p>
          <p className="font-semibold md:text-2xl text-xl text-[#2E8B57]">
            Grow Together, Invest Smarter
          </p>
          <p className="text-sm text-[#6E6E6E]">
            Join like-minded investors in private circles where you can share
            opportunities, discuss strategies, and collaborate to achieve your
            financial goals.
          </p>
        </div>
        <div className="hidden md:flex">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-4 rounded flex items-center gap-2"
          >
            {showAll ? "Show Less" : "View All"} <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto px-4 scrollbar-hide">
        {displayedCircles.map((circle, i) => (
          <InvestorCard key={i} circle={circle} />
        ))}
      </div>

      {/* Desktop: flexbox instead of grid */}
      <div className="hidden md:flex flex-wrap gap-6 justify-center px-6">
        {displayedCircles.map((circle, i) => (
          <InvestorCard key={i} circle={circle} />
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="flex md:hidden w-full h-4 mt-7 justify-center items-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-28 rounded-2xl flex items-center gap-2"
        >
          {showAll ? "Show Less" : "View All"} <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Investors;
