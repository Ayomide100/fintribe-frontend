/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/config/axiosconfig";
import noface from "../../assets/blank-profile-picture.webp";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import {
  Bookmark,
  CircleAlert,
  Edit,
  EllipsisVertical,
  Heart,
  Trash,
} from "lucide-react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );
  const [userId, setUserId] = useState("");

  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const capitalizeWords = (str: string) =>
    str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";

  function timeAgoShort(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    const years = Math.floor(days / 365);
    return `${years}y`;
  }
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      // API response shape has content array
      // guard in case API wraps differently
      const data = res.data?.content ?? res.data;
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("fetchPosts error:", error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!text.trim()) return;

    try {
      await axios.post(
        `/posts/${postId}/comments`,
        { text },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      setText("");
      await fetchPosts();
      setActiveCommentPostId(null);
    } catch (error) {
      console.error("handleComment error:", error);
    }
  };

  const HandleLikesonPost = async (postId: string) => {
    try {
      await axios.post(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );
      fetchPosts();
    } catch (error) {
      console.error("like error:", error);
    }
  };

  const HandleUnlikePost = async (postId: string) => {
    try {
      await axios.delete(`/posts/${postId}/like`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("unlike error:", error);
    }
  };

  const HandleDeleteComment = async (postId: string, commentId: string) => {
    try {
      await axios.delete(`/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("delete comment error:", error);
    }
  };

  const toggleSavePost = async (
    postId: string,
    isSaved: boolean,
    savedItemId?: string | null,
    type: "Post" | "Circle" | "Opportunity" = "Post"
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (isSaved && savedItemId) {
        await axios.delete(`/saved/${savedItemId}`, {
          data: { type },
          headers: { Authorization: `${token}` },
        });

        // 🔥 optimistic unsave
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, isSaved: false, savedItemId: null }
              : post
          )
        );

        toast.success("Post removed from saved");
      } else {
        const res = await axios.post(
          `/saved/${postId}`,
          { type },
          { headers: { Authorization: `${token}` } }
        );

        const newSavedItemId = res.data?.content?._id;

        // 🔥 optimistic save
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  isSaved: true,
                  savedItemId: newSavedItemId,
                }
              : post
          )
        );

        toast.success("Post saved successfully");
      }
    } catch (error) {
      console.error("toggle save error:", error);
      toast.error("Failed to update saved post");
    }
  };

  const HandleDeletePost = async (postId: string) => {
    try {
      const res = await axios.delete(`/posts/${postId}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      console.log("Delete response:", res.data);
      fetchPosts();
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
    // Accept either storage key you might be using
    const uid = localStorage.getItem("userId") ?? localStorage.getItem("_id");
    if (uid) setUserId(uid);
    fetchPosts();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        <>
          {posts.map((post: any) => {
            // API uses `content` and `media` per your example
            const body = post.content ?? post.text ?? "";
            const media = post.media ?? post.images ?? [];

            return (
              <div
                key={post._id}
                className="w-full bg-white mt-5 rounded-md shadow-md flex flex-col justify-start px-5 py-4"
              >
                {/* Post Header */}
                <div className="w-full  flex justify-between items-center gap-3 mb-3">
                  <div className=" flex justify-start items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                      <Image
                        src={post.user?.avatar?.url || noface}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 capitalize">
                        {post.user?.fullname
                          ? capitalizeWords(post.user.fullname)
                          : "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {timeAgoShort(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="cursor-pointer text-gray-500">
                      <EllipsisVertical
                        size={20}
                        onClick={() =>
                          setActiveDropdownId(
                            activeDropdownId === post._id ? null : post._id
                          )
                        }
                      />
                    </div>

                    {activeDropdownId === post._id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                          <Edit size={16} /> Edit Post
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                          <CircleAlert size={16} /> Report Post
                        </button>
                        <button
                          onClick={() => HandleDeletePost(post._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                        >
                          <Trash size={16} /> Delete Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Text / Content */}
                <p className="text-gray-800 text-sm mb-3">{body}</p>

                {/* Media Grid (Option B) */}
                {Array.isArray(media) && media.length > 0 && (
                  <div
                    className={`
                      grid gap-2 mt-2
                      ${
                        media.length === 1
                          ? "grid-cols-1"
                          : media.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-2"
                      }
                    `}
                  >
                    {media.slice(0, 3).map((m: any, index: number) => (
                      <div
                        key={m.id ?? m._id ?? index}
                        className={`
                          w-full overflow-hidden rounded-md
                          ${
                            media.length >= 3 && index === 0
                              ? "col-span-2 h-[300px]"
                              : "h-[250px]"
                          }
                        `}
                      >
                        <Image
                          src={m.url}
                          alt="post media"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {media.length > 3 && (
                      <div className="w-full h-[250px] bg-black/40 rounded-md flex justify-center items-center">
                        <span className="text-white text-lg font-semibold">
                          +{media.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="w-full flex justify-between border-t border-[#E0E0E0] items-center text-gray-600 mt-4 px-2">
                  <div className="w-[25%] flex py-2.5 justify-between gap-1.5 items-center">
                    <button
                      onClick={() =>
                        (post.likes ?? []).some((like: any) =>
                          typeof like === "string"
                            ? like === userId
                            : like?._id === userId || like === userId
                        )
                          ? HandleUnlikePost(post._id)
                          : HandleLikesonPost(post._id)
                      }
                      className="flex items-center gap-1 text-sm hover:text-blue-600"
                    >
                      <Heart
                        size={18}
                        className={
                          (post.likes ?? []).some((like: any) =>
                            typeof like === "string"
                              ? like === userId
                              : like?._id === userId || like === userId
                          )
                            ? "text-blue-600"
                            : ""
                        }
                      />
                      <span>{(post.likes ?? []).length || 0}</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveCommentPostId(
                          activeCommentPostId === post._id ? null : post._id
                        )
                      }
                      className="flex items-center gap-1 text-sm hover:text-blue-600"
                    >
                      <AiOutlineComment size={18} />{" "}
                      <span>{(post.comments ?? []).length || 0}</span>
                    </button>

                    <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                      <AiOutlineShareAlt size={18} />{" "}
                      <span>{post.shares || 0}</span>
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      toggleSavePost(post._id, post.isSaved, post.savedItemId)
                    }
                    className={`flex items-center gap-1 text-sm transition ${
                      post.isSaved ? "text-green-600" : "hover:text-green-600"
                    }`}
                  >
                    {post.isSaved ? (
                      <FaBookmark size={18} className="text-green-600" />
                    ) : (
                      <Bookmark size={18} className="text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentPostId === post._id && (
                  <div className="mt-3">
                    <div className="max-h-64 overflow-y-auto space-y-3 pr-2 mb-4">
                      {post.comments &&
                        (post.comments as any[]).map((comment: any) => (
                          <div
                            key={comment._id ?? `${post._id}-${Math.random()}`}
                            className="flex gap-2 items-start"
                          >
                            {/* Avatar */}
                            <Image
                              src={comment.user?.avatar?.url || noface}
                              alt="comment user"
                              width={30}
                              height={30}
                              className="w-8 h-8 rounded-full object-cover border"
                            />

                            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm flex-1">
                              <div className="flex justify-between items-center">
                                <p className="font-semibold">
                                  {comment.user?.fullname
                                    ? capitalizeWords(comment.user.fullname)
                                    : "Unknown"}
                                </p>

                                {comment.user?._id === userId && (
                                  <button
                                    onClick={() =>
                                      HandleDeleteComment(post._id, comment._id)
                                    }
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash size={14} />
                                  </button>
                                )}
                              </div>

                              <p className="text-gray-700">{comment.text}</p>
                              <span className="text-xs text-gray-500">
                                {timeAgoShort(comment.createdAt)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* New comment input */}
                    <div className="flex gap-2 items-center pt-2 border-t border-gray-200">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border border-[#84C2A2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                      />
                      <button
                        onClick={() => handleComment(post._id)}
                        className="px-3 py-2 bg-[#0A2540] text-white rounded-md text-sm hover:bg-[#1a3b5c]"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );
};

export default Posts;
