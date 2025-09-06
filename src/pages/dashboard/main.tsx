import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import Image from "next/image";
import userprofilepic from "../../../assets/user.jpg";
import postImage from "../../../assets/d072c25443f441b7143033251e6b7d2148a98433.jpg";
import post2image from "../../../assets/57bb80ed3d1af1b175dda138130249ea0fc160b8.jpg";
import post3image from "../../../assets/a3a16f22b871b5b60428bdef198c2d6598854556.jpg";
import suitguy from "../../../assets/suitguy.jpg";

import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Bookmark, ShieldCheck } from "lucide-react";

const Main = () => {
  const Newsfeed = [
    {
      id: 1,
      name: "Adebimpe Thompson",
      role: "Real Estate Expert",
      time: "2 hours ago",
      avatar: suitguy,
      content:
        "The Nigerian real estate market is showing strong fundamentals despite global uncertainties. Here's why I'm bullish on commercial properties in Lagos and Abuja for 2024...",
      image: postImage,
      likes: 12,
      comments: 8,
      shares: 4,
    },
    {
      id: 2,
      name: "Michael Johnson",
      role: "Financial Analyst",
      time: "5 hours ago",
      avatar: userprofilepic,
      content:
        "Global markets are shifting. Here’s what Nigerian investors should know about FX policies and upcoming reforms...",
      image: post2image,
      likes: 34,
      comments: 15,
      shares: 10,
    },
    {
      id: 3,
      name: "Grace Williams",
      role: "Tech Entrepreneur",
      time: "1 day ago",
      avatar: suitguy,
      content:
        "Fintech adoption is rising in Africa faster than ever. These are the three trends I’m tracking closely in 2024...",
      image: post3image,
      likes: 45,
      comments: 20,
      shares: 17,
    },
  ];

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Dashboard</title>
      </Head>
      <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-hide px-5 py-6 space-y-4">
        {/* Share Box */}
        <div className="w-full h-[11%] bg-[#FFFFFF] cursor-pointer rounded-md shadow-md flex justify-start px-5 gap-4 items-center">
          <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center">
            <Image
              src={userprofilepic}
              alt="notification"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-sm font-normal text-gray-700">
            Share an investment insight, market update, or question...
          </p>
        </div>

        {/* Feed Posts */}
        {Newsfeed.map((post) => (
          <div
            key={post.id}
            className="w-full bg-white rounded-md shadow-md flex flex-col justify-start px-5 py-4"
          >
            {/* Post Header */}
            <div className="w-full flex justify-start items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
                <Image
                  src={post.avatar}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full border-2 border-[#226B44]"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  {post.name}
                  <span className="text-[#2E8B57] text-xs">
                    <ShieldCheck size={15} />
                  </span>
                </h3>
                <p className="text-xs text-gray-500">
                  {post.role} · {post.time}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="mt-3 text-sm text-gray-700">{post.content}</p>

            {/* Post Image */}
            <div className="mt-3 rounded-md overflow-hidden">
              <Image
                src={post.image}
                alt="Post visual"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Actions */}
            <div className="w-full flex justify-between border-t border-[#E0E0E0] items-center text-gray-600 mt-4 px-2">
              <div className="w-[25%] flex py-2.5 justify-between gap-1.5 items-center">
                <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                  <AiOutlineLike size={18} /> <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                  <AiOutlineComment size={18} /> <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                  <AiOutlineShareAlt size={18} /> <span>{post.shares}</span>
                </button>
              </div>
              <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Dashboardlayouts>
  );
};

export default Main;
