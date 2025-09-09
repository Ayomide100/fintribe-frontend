import React, { useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Image from "next/image";
import { Search } from "lucide-react";

// Dummy user images
import userAvatar from "../../../assets/user.jpg";
import Head from "next/head";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");

  const notifications = [
    {
      id: 1,
      type: "post",
      title: "New post from Adebimpe Thompson",
      message:
        "5 ways to spot safe agri-business investments in emerging markets. Learn the key indicators that separates profitable opportunities from potential losses",
      time: "2 hours ago",
      avatar: userAvatar,
      unread: true,
    },
    {
      id: 2,
      type: "circle",
      title: "Tech StartUp Circle",
      message:
        "The Tech StartUp has created a new poll asking members to vote on which AI startup has the most potential for growth this year.",
      time: "3 hours ago",
      avatar: userAvatar,
      unread: true,
    },
    {
      id: 3,
      type: "circle",
      title: "Tech StartUp Circle",
      message:
        "The Tech StartUp has created a new poll asking members to vote on which AI startup has the most potential for growth this year.",
      time: "3 hours ago",
      avatar: userAvatar,
      unread: false,
    },
  ];

  // Filter logic based on tab
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "All") return true;
    if (activeTab === "Read") return !notif.unread;
    if (activeTab === "Unread") return notif.unread;
    return true;
  });

  return (
    <Dashboardlayouts>
      <Head>
        <title>Notifications | FinTribe</title>
      </Head>
      <div className="w-full h-full px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Notifications
            </h1>
            <p className="text-sm text-gray-500">
              Stay updated with your investments and community
            </p>
          </div>
          <button className="text-sm text-[#2E8B57] font-medium hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="md:flex hidden justify-between items-center">
          <div className="relative  w-[40%]">
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {/* Tabs */}
          <div className="flex gap-3">
            {["All", "Read", "Unread"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md border transition ${
                  activeTab === tab
                    ? "bg-[#2E8B57] text-white border-[#2E8B57"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 rounded-lg p-4 border border-gray-200 relative ${
                notif.unread ? "bg-green-50" : "bg-white"
              }`}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={notif.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">
                  {notif.title}
                </h3>
                <p className="text-sm text-gray-600">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>

              {/* Status dot */}
              {notif.unread && (
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 absolute top-4 right-4"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Notifications;
