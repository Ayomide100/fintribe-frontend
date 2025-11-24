/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import noface from "../../../assets/blank-profile-picture.webp";
import { Edit, Mail, Phone, User } from "lucide-react";
import { isAxiosError } from "axios";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import EditProfileModal from "@/Modals/EditProfileModal";

const Profile = () => {
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    noface
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "liked" | "comments">(
    "posts"
  );
  const [user, setUser] = useState<any>(null);

  // Inside Profile component
  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    if (updatedUser.avatar && updatedUser.avatar.url) {
      setProfileImage(updatedUser.avatar.url);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      const fetchedUser = res.data.content.user;
      setUser(fetchedUser);

      // Use avatar if it exists
      if (fetchedUser.avatar) {
        setProfileImage(fetchedUser.avatar.url);
      }
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
    getUser();
  }, []);

  // Example tab content
  const posts = [
    { id: 1, title: "Sustainable Investing 101", date: "Oct 1, 2025" },
    { id: 2, title: "The Rise of Clean Tech Startups", date: "Sep 25, 2025" },
    { id: 3, title: "Why Green Energy Matters", date: "Sep 10, 2025" },
  ];

  const liked = [
    { id: 1, title: "10 Ways to Save Energy", author: "David John" },
    { id: 2, title: "Fintech Revolution", author: "Mary Oke" },
  ];

  const comments = [
    {
      id: 1,
      text: "Loved this post on sustainability!",
      post: "The Rise of Clean Tech Startups",
    },
    {
      id: 2,
      text: "This was super insightful, thanks!",
      post: "Why Green Energy Matters",
    },
  ];

  return (
    <Dashboardlayouts>
      <Head>
        <title>Profile | Fintribe</title>
      </Head>

      <div className="w-full min-h-screen overflow-y-scroll bg-white pb-10">
        {/* Header */}
        <div className="w-full flex flex-col justify-center items-start px-5 pt-6 md:px-7 md:pt-10">
          <p className="font-medium text-xl md:text-2xl text-gray-900">
            Profile
          </p>
          <p className="text-sm text-[#6E6E6E]">
            Manage your Profile Information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full flex justify-center items-center mt-6">
          <div className="w-[94%] md:w-[96%] h-auto shadow-md border border-[#E0E0E0] rounded-xl flex flex-col items-center py-6 px-4 md:px-6">
            {/* Top Section */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
              <div className="flex flex-col md:flex-row justify-start items-center gap-4 md:gap-6 relative w-full md:w-[60%]">
                {/* Profile Image */}
                <div className="relative w-[90px] h-[90px] md:w-[100px] md:h-[100px]">
                  <div className="w-full h-full rounded-full border-2 border-[#2E8B57] overflow-hidden relative">
                    <Image
                      src={user?.avatar?.url || profileImage || noface}
                      alt="profile"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center md:text-left">
                  <p className="font-medium text-lg md:text-xl capitalize">
                    {user?.fullname || "Loading..."}
                  </p>
                  <p className="text-sm text-[#2E8B57]">
                    Member since{" "}
                    {user
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })
                      : ""}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border-[#2E8B57] border text-[#2E8B57] flex gap-2 justify-center items-center px-5 py-2 rounded-md hover:bg-[#2E8B57] hover:text-white transition-all text-sm md:text-base"
                >
                  <Edit size={18} /> Edit Profile
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-[#E0E0E0] my-6" />

            {/* Bottom Info */}
            <div className="w-full flex flex-col gap-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <User size={16} />
                  <p>{user?.username || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <Mail size={16} />
                  <p>{user?.email || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <Phone size={16} />
                  <p>{user?.phone || "N/A"}</p>
                </div>
              </div>

              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                {user?.bio || "No bio provided."}
              </p>

              {/* <p className="text-sm text-gray-500">
                Account Type:{" "}
                <span className="capitalize text-[#2E8B57]">
                  {user?.account_type}
                </span>
              </p> */}

              {/* <p className="text-sm text-gray-500">
                KYC Status:{" "}
                <span
                  className={`font-medium ${
                    user?.kycStatus === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {user?.kycStatus || "unknown"}
                </span>
              </p> */}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full flex flex-col mt-8 items-center">
          <div className="w-[94%] md:w-[96%] flex justify-around border-b border-[#E0E0E0] mb-4">
            {(["posts", "liked", "comments"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-1/3 text-center py-2 capitalize font-medium text-sm md:text-base transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-[#2E8B57] text-[#2E8B57]"
                    : "text-[#6E6E6E] hover:text-[#2E8B57]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="w-[94%] md:w-[96%] bg-white h-100 overflow-y-auto rounded-xl border border-[#E0E0E0] p-4 shadow-sm">
            {activeTab === "posts" && (
              <div className="flex flex-col gap-4">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="border border-[#E0E0E0] p-4 rounded-lg hover:bg-[#F9FAF9] transition-all"
                  >
                    <p className="font-semibold text-gray-800">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "liked" && (
              <div className="flex flex-col gap-4">
                {liked.map((l) => (
                  <div
                    key={l.id}
                    className="border border-[#E0E0E0] p-4 rounded-lg hover:bg-[#F9FAF9] transition-all"
                  >
                    <p className="font-semibold text-gray-800">{l.title}</p>
                    <p className="text-sm text-gray-500">by {l.author}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "comments" && (
              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="border border-[#E0E0E0] p-4 rounded-lg hover:bg-[#F9FAF9] transition-all"
                  >
                    <p className="text-gray-700">{c.text}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      on &ldquo;{c.post}&ldquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsModalOpen(false)}
            onSave={handleProfileUpdate} // <-- THIS IS WHAT TRIGGERS THE REFRESH
          />
        )}
      </div>
    </Dashboardlayouts>
  );
};

export default Profile;
