import Head from "next/head";
import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { Bookmark, Settings, ShieldCheck } from "lucide-react";
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
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";

const Circles = () => {
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

  const circles = [
    {
      id: 1,
      name: "Lagos Property Investors",
      members: "2.3k Members",
      image: "/circle1.png",
      unread: 0,
    },
    {
      id: 2,
      name: "Crypto Gurus",
      members: "5.1k Members",
      image: "/circle2.png",
      unread: 32,
    },
    {
      id: 3,
      name: "Stock Market Watch",
      members: "1.9k Members",
      image: "/circle3.png",
      unread: 12,
    },
  ];

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Circles</title>
      </Head>
      <div className="w-full h-full px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Investment Circles
            </h1>
            <p className="text-sm text-gray-500">
              Connect with like-minded investors and industry experts
            </p>
          </div>
          <button className="bg-[#0A2540] text-white px-4 py-2 rounded-lg shadow hover:bg-[#0d2f57] transition">
            + Create a Circle
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 bg-gray-50 border border-gray-200 rounded-lg p-2">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-white shadow">
            My Circles
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            Joined Circles
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            Explore Circles
          </button>
        </div>
        <div className="w-full h-[15%]  flex justify-between border-b  border-[#E0E0E0] items-center">
          <div className="w-[40%] h-full  flex justify-start gap-2 px-5 items-center">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-green-400">
              <Image
                src={postImage}
                alt="Circle Image"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className=" font-semibold text-lg">Lagos Property Investors</p>
          </div>
          <div className="w-[10%] h-full flex justify-around items-center">
            <div className=" bg-white shadow-md  px-2 py-2 rounded-md">
              <FiEdit size={20} />
            </div>
            <div className="bg-white shadow-md  px-2 py-2 rounded-md">
              <Settings />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 h-[80vh]">
          {/* Sidebar - My Circles */}
          <div className="col-span-4 bg-white rounded-xl shadow border border-gray-100 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <TbFidgetSpinner size={18} className="text-green-600" />
              <h2 className="text-sm font-semibold text-gray-800">
                My Circles
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {circles.map((circle) => (
                <button
                  key={circle.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition relative"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={circle.image}
                      alt={circle.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {circle.name}
                    </span>

                    <span className="text-xs text-gray-500">
                      <TbLockAccess className="inline-block w-4 h-4 mr-1 text-[#226B44]" />
                      • {""} {circle.members}
                    </span>
                  </div>
                  {circle.unread > 0 && (
                    <span className="absolute right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {circle.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Newsfeed */}
          <div className="col-span-8 space-y-5 overflow-y-auto">
            {Newsfeed.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow border border-gray-100 p-5"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#226B44]">
                    <Image
                      src={post.avatar}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                      {post.name}
                      <ShieldCheck
                        size={16}
                        className="text-[#2E8B57] inline-block"
                      />
                    </h3>
                    <p className="text-xs text-gray-500">
                      {post.role} · {post.time}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="mt-3 text-sm text-gray-700">{post.content}</p>

                {/* Post Image */}
                <div className="mt-3 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Post visual"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center text-gray-600 mt-4 border-t border-gray-200 pt-3">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition">
                      <AiOutlineLike size={18} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition">
                      <AiOutlineComment size={18} /> {post.comments}
                    </button>
                    <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition">
                      <AiOutlineShareAlt size={18} /> {post.shares}
                    </button>
                  </div>
                  <button className="hover:text-blue-600 transition">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Circles;
