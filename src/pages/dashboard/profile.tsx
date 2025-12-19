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
import PostDetailsModal from "@/Modals/postdetails";
import UserListModal from "@/Modals/userlistmodal";

export interface LikedPost {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    username: string;
    avatar: {
      url: string;
      id: string;
    };
  };
  content: string;
  media: { url: string; id: string }[];
  likes: string[];
  comments: {
    user: {
      _id: string;
      fullname: string;
      username: string;
      avatar: {
        url: string;
      };
    };
    text: string;
    _id: string;
    createdAt: string;
  }[];
  likedAt: string;
  createdAt: string;
}

export interface UserComment {
  _id: string;
  text: string;
  createdAt: string;
  post: {
    _id: string;
    content: string;
    media: { url: string; id: string }[];
    user: {
      fullname: string;
      username: string;
      avatar: { url: string };
    };
  };
}

const Profile = () => {
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    noface
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "posts" | "liked" | "comments" | "followers" | "following"
  >("posts");
  const [user, setUser] = useState<any>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<
    LikedPost | UserComment | null
  >(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const [userListTitle, setUserListTitle] = useState("");
  const [userListData, setUserListData] = useState<any[]>([]);

  const [following, setFollowing] = useState<any[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);

  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
  const [commentsList, setCommentsList] = useState<any[]>([]);

  const [loadingLiked, setLoadingLiked] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    if (updatedUser.avatar?.url) setProfileImage(updatedUser.avatar.url);
  };

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      const fetchedUser = res.data.content.user;
      setUser(fetchedUser);

      if (fetchedUser.avatar) setProfileImage(fetchedUser.avatar.url);
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

  const getLikedPost = async () => {
    try {
      setLoadingLiked(true);
      const res = await axios.get("/posts/liked?page=1&limit=20", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      setLikedPosts(res.data.data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load liked posts.");
    } finally {
      setLoadingLiked(false);
    }
  };

  const getComments = async () => {
    try {
      setLoadingComments(true);
      const res = await axios.get("/posts/user_comment?page=1&limit=20", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      setCommentsList(res.data.data.posts);
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
    } finally {
      setLoadingComments(false);
    }
  };

  // ------------------------ FOLLOWERS ------------------------
  const getFollowers = async () => {
    try {
      setLoadingFollowers(true);
      const res = await axios.get("/users/followers?pages=1&limit=20", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      setFollowers(res.data?.content?.followers || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFollowers(false);
    }
  };

  // ------------------------ FOLLOWING ------------------------
  const getFollowing = async () => {
    try {
      setLoadingFollowing(true);
      const res = await axios.get("/users/followings?pages=1&limit=20", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      setFollowing(res.data?.content?.following || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFollowing(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (activeTab === "followers") getFollowers();
    if (activeTab === "following") getFollowing();
    if (activeTab === "liked") getLikedPost();
    if (activeTab === "comments") getComments();
  }, [activeTab]);

  // Example static data
  const posts = [
    { id: 1, title: "Sustainable Investing 101", date: "Oct 1, 2025" },
    { id: 2, title: "The Rise of Clean Tech Startups", date: "Sep 25, 2025" },
    { id: 3, title: "Why Green Energy Matters", date: "Sep 10, 2025" },
  ];

  const currentUserId = user?._id; // logged-in user id

  const userComments = (commentsList || [])
    .map((post) => {
      const myComments = post.comments?.filter(
        (c: { user: any }) => c.user === currentUserId
      );

      if (!myComments || myComments.length === 0) return null;

      return {
        ...post,
        comments: myComments,
      };
    })
    .filter(Boolean);

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
              <div className="flex flex-col md:flex-row justify-start items-center gap-4 md:gap-6 w-full md:w-[60%]">
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

                <div className="text-center md:text-left">
                  <p className="font-medium text-lg md:text-xl capitalize">
                    {user?.fullname || "Loading..."}
                  </p>
                  <p className="text-sm text-[#2E8B57]">
                    Member since{" "}
                    {user &&
                      new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border-[#2E8B57] border text-[#2E8B57] flex gap-2 justify-center items-center px-5 py-2 rounded-md hover:bg-[#2E8B57] hover:text-white transition-all text-sm md:text-base"
                >
                  <Edit size={18} /> Edit Profile
                </button>
              </div>
            </div>

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
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="w-full flex flex-col mt-8 items-center">
          <div className="w-[94%] md:w-[96%] flex justify-around border-b border-[#E0E0E0] mb-4">
            {(
              ["posts", "liked", "comments", "followers", "following"] as const
            ).map((tab) => (
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

          <div className="w-[94%] md:w-[96%]  max-h-[500px] overflow-y-scroll  bg-white rounded-xl border border-[#E0E0E0] p-4 shadow-sm">
            {/* POSTS */}
            {activeTab === "posts" && (
              <div className="flex flex-col gap-4">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="border border-[#E0E0E0] p-4 rounded-lg hover:bg-[#F9FAF9]"
                  >
                    <p className="font-semibold text-gray-800">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "liked" && (
              <div>
                {loadingLiked ? (
                  <p className="text-center py-4 text-gray-500">
                    Loading liked posts...
                  </p>
                ) : likedPosts.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    No liked posts yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {loadingLiked && <p>Loading...</p>}

                    {likedPosts.map((post) => (
                      <div
                        onClick={() => {
                          setSelectedPost(post);
                          setIsPostModalOpen(true);
                        }}
                        key={post._id}
                        className="p-4 bg-white shadow rounded-lg border border-gray-200"
                      >
                        {/* USER INFO */}
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={post.user.avatar.url}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                            alt="avatar"
                          />
                          <div>
                            <p className="font-semibold capitalize">
                              {post.user.fullname}
                            </p>
                            <p className="text-sm text-gray-500">
                              @{post.user.username}
                            </p>
                          </div>
                        </div>

                        {/* POST CONTENT */}
                        <p className="mb-3 text-gray-800">{post.content}</p>

                        {/* MEDIA */}
                        {post.media.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {post.media.map((img) => (
                              <Image
                                key={img.id}
                                alt="post-media"
                                src={img.url}
                                className="w-full rounded-lg object-cover"
                                width={200}
                                height={200}
                              />
                            ))}
                          </div>
                        )}

                        {/* FOOTER */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <p>❤️ {post.likes.length} likes</p>
                          <p>💬 {post.comments.length} comments</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* COMMENTS */}
            {activeTab === "comments" && (
              <div>
                {loadingComments ? (
                  <p className="text-center py-4 text-gray-500">
                    Loading comments...
                  </p>
                ) : userComments.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    No comments yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {userComments.map((post) => (
                      <div
                        key={post._id}
                        onClick={() => {
                          setSelectedPost(post);
                          setIsPostModalOpen(true);
                        }}
                        className="p-4 bg-white shadow rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        {/* POST OWNER */}
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={post.user.avatar?.url || "/default-avatar.png"}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                            alt="avatar"
                          />
                          <div>
                            <p className="font-semibold capitalize">
                              {post.user.fullname}
                            </p>
                            <p className="text-sm text-gray-500">
                              @{post.user.username}
                            </p>
                          </div>
                        </div>

                        {/* YOUR COMMENT */}
                        {post.comments.map(
                          (comment: {
                            _id: React.Key | null | undefined;
                            text:
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                          }) => (
                            <div
                              key={comment._id}
                              className="bg-gray-100 rounded-lg p-3 mb-3"
                            >
                              <p className="text-sm font-medium text-gray-700">
                                Your comment
                              </p>
                              <p className="text-gray-800">{comment.text}</p>
                            </div>
                          )
                        )}

                        {/* POST CONTENT */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FOLLOWERS */}
            {activeTab === "followers" && (
              <div>
                {loadingFollowers ? (
                  <p className="text-center py-4 text-gray-500">
                    Loading followers...
                  </p>
                ) : followers.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    No followers yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {followers.map((f) => (
                      <div
                        onClick={() => {
                          setUserListTitle("Followers");
                          setUserListData(followers);
                          setIsUserListModalOpen(true);
                        }}
                        key={f._id}
                        className="border border-[#E0E0E0] p-4 rounded-lg flex items-center gap-4 hover:bg-[#F9FAF9]"
                      >
                        <Image
                          src={f.avatar?.url || noface}
                          width={45}
                          height={45}
                          className="rounded-full object-cover border"
                          alt="follower"
                        />

                        <div>
                          <p className="font-medium capitalize">{f.fullname}</p>
                          <p className="text-sm text-gray-500">{f.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FOLLOWING */}
            {activeTab === "following" && (
              <div>
                {loadingFollowing ? (
                  <p className="text-center py-4 text-gray-500">
                    Loading following...
                  </p>
                ) : following.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    You are not following anyone yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {following.map((f) => (
                      <div
                        onClick={() => {
                          setUserListTitle("Followers");
                          setUserListData(followers);
                          setIsUserListModalOpen(true);
                        }}
                        key={f._id}
                        className="border border-[#E0E0E0] p-4 rounded-lg flex items-center gap-4 hover:bg-[#F9FAF9]"
                      >
                        <Image
                          src={f.avatar?.url || noface}
                          width={45}
                          height={45}
                          className="rounded-full object-cover border"
                          alt="following"
                        />

                        <div>
                          <p className="font-medium capitalize">{f.fullname}</p>
                          <p className="text-sm text-gray-500">{f.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsModalOpen(false)}
            onSave={handleProfileUpdate}
          />
        )}
        {isPostModalOpen && selectedPost && (
          <PostDetailsModal
            post={selectedPost}
            onClose={() => {
              setIsPostModalOpen(false);
              setSelectedPost(null);
            }}
          />
        )}

        {isUserListModalOpen && (
          <UserListModal
            title={userListTitle}
            users={userListData}
            onClose={() => setIsUserListModalOpen(false)}
          />
        )}
      </div>
    </Dashboardlayouts>
  );
};

export default Profile;
