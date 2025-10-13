import Head from "next/head";
import React, { useEffect, useState } from "react";
import Dashboardlayouts from "../../layouts/Dashboardlayouts";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import {
  Bookmark,
  EllipsisVertical,
  Settings,
  ShieldCheck,
} from "lucide-react";
import userprofilepic from "../../../../assets/user.jpg";
// import postImage from "../../../assets/d072c25443f441b7143033251e6b7d2148a98433.jpg";
import post2image from "../../../../assets/57bb80ed3d1af1b175dda138130249ea0fc160b8.jpg";
import post3image from "../../../../assets/a3a16f22b871b5b60428bdef198c2d6598854556.jpg";
import suitguy from "../../../../assets/suitguy.jpg";
import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";
import CreateCircleModal from "@/Modals/createcirclemodal";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Explorecircles from "./explorecircles";
import Joinedcircles from "./joinedcircles";
import Mycircles from "./Mycircles";

interface Circle {
  _id: string;
  name: string;
  description: string;
  icon: {
    url: string;
    id: string;
  };
  type: "public" | "private";
  createdAt: string;
  updatedAt: string;
  totalMembers: number;
  topMembers: {
    _id: string;
    avatar: {
      url: string | null;
      id?: string;
    } | null;
    name: string;
  }[];
  remainingCount: number;

  // Optional extra fields for UI
  unread?: number;
  image?: string;
  members?: number;
}

interface Tab {
  key: string;
  label: string;
}

interface ActionTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  className?: string;
}

const ActionTabs: React.FC<ActionTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div
      className={`flex gap-2 sm:gap-4 bg-gray-50  rounded-lg p-2 overflow-x-auto scrollbar-hide ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === tab.key
              ? "bg-white shadow text-gray-900"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const Circles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [circles, setCircles] = useState<Circle[]>([]);

  const [activeTab, setActiveTab] = useState<"joined" | "explore" | "my">(
    "joined"
  );
  const [accountType, setAccountType] = useState<string | null>(null);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey as "joined" | "explore" | "my");
  };

  const tabs = [
    { key: "joined", label: "Joined Circles" },
    { key: "explore", label: "Explore Circles" },
    ...(accountType === "expert" ? [{ key: "my", label: "My Circles" }] : []),
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "joined":
        return <Joinedcircles />;
      case "explore":
        return <Explorecircles />;
      case "my":
        return <Mycircles />;
      default:
        return <Joinedcircles />;
    }
  };

  const getAllCircles = async () => {
    try {
      const res = await axios.get("circle?page=1&limit=6", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Extract circles properly
      setCircles(res.data.content.circles);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.content.user.account_type);

      setAccountType(res.data.content.user.account_type);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getAllCircles();
    getUser();
  }, []);
  const Newsfeed = [
    {
      id: 1,
      name: "Adebimpe Thompson",
      role: "Real Estate Expert",
      time: "2 hours ago",
      avatar: suitguy,
      content:
        "The Nigerian real estate market is showing strong fundamentals despite global uncertainties. Here's why I'm bullish on commercial properties in Lagos and Abuja for 2024...",
      image: post2image,
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
        "Global markets are shifting. Here's what Nigerian investors should know about FX policies and upcoming reforms...",
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
        <title>FinTribe || Circles</title>
      </Head>
      <div className="w-full h-full px-4 sm:px-6 py-6 space-y-6 overflow-y-scroll">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Investment Circles
            </h1>
            <p className="text-sm text-gray-500">
              Connect with like-minded investors and industry experts
            </p>
          </div>
          {accountType === "expert" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0A2540] text-white px-4 py-2 rounded-lg shadow hover:bg-[#0d2f57] transition text-sm"
            >
              + Create a Circle
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 bg-gray-50 border border-gray-200 rounded-lg p-2 overflow-x-auto scrollbar-hide">
          <ActionTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        {!activeTab && (
          <>
            {/* Circle Header */}
            <div className="w-full h-[15%] flex sm:px-3 px-0 justify-between border-b border-[#E0E0E0] items-center gap-3 pb-2">
              <div className="flex justify-start gap-2 sm:gap-4 items-center w-full sm:w-[40%]">
                <div className="w-[45px] h-[45px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center items-center bg-green-400">
                  <Image
                    src={post2image}
                    alt="Circle Image"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <p className="font-semibold text-sm sm:text-lg">
                  Lagos Property Investors
                </p>
              </div>
              <div className="flex gap-3">
                {accountType === "user" ? (
                  <div className="bg-white shadow-md px-2 py-2 rounded-md">
                    <EllipsisVertical size={18} />
                  </div>
                ) : (
                  <>
                    <div className="bg-white shadow-md px-2 py-2 rounded-md">
                      <FiEdit size={18} />
                    </div>
                    <div className="bg-white shadow-md px-2 py-2 rounded-md">
                      <Settings size={18} />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[80vh]">
              {/* Sidebar - My Circles */}
              <div className="lg:col-span-4 bg-white rounded-xl shadow border border-gray-100 p-4 max-h-[40vh] lg:max-h-full overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <TbFidgetSpinner size={18} className="text-green-600" />
                  <h2 className="text-sm font-semibold text-gray-800">
                    My Circles
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  {circles.map((circle) => (
                    <button
                      key={circle._id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition relative text-left"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200"></div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {circle.name}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <TbLockAccess className="w-4 h-4 mr-1 text-[#226B44]" />
                          {circle.members}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsfeed */}
              <div className="lg:col-span-8 space-y-5 overflow-y-auto">
                {Newsfeed.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow border border-gray-100 p-5"
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-[40%] h-full flex items-center px-1 gap-2">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#226B44]">
                          <Image
                            src={post.avatar}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-[82%] h-full">
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

                      {accountType === "user" && <EllipsisVertical />}
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
                      <div className="flex gap-6 text-sm">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition">
                          <AiOutlineLike size={18} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition">
                          <AiOutlineComment size={18} /> {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition">
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
          </>
        )}

        {renderTabContent()}
        <CreateCircleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Dashboardlayouts>
  );
};

export default Circles;
