/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  EllipsisVertical,
} from "lucide-react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import CommentModal from "./commentModal";

const CirclePostCard = ({ post, selectedCircle, getTimeAgo }: any) => {
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [showComments, setShowComments] = useState(false);

  const [liked, setLiked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [isSaved, setIsSaved] = useState<boolean>(post?.isSaved ?? false);

  const handleLikePost = async (postId: string) => {
    try {
      // Optimistic update (immediate feedback)
      setLiked((prev: any) => !prev);
      setLikeCount((prev: number) => (liked ? prev - 1 : prev + 1));

      const res = await axios.post(
        `/circle/post/like?postId=${postId}`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      // Sync with backend (optional)
      if (res?.data?.content) {
        setLiked(res.data.content.liked);
        setLikeCount(res.data.content.likeCount);
      }
    } catch (error) {
      // Log and revert on error
      console.error(error);
      setLiked((prev: any) => !prev);
      setLikeCount((prev: number) => (liked ? prev + 1 : prev - 1));
      toast.error("Failed to like post");
    }
  };

  const handleShare = (postId: string) => {
    const link = `${window.location.origin}/circle/post/${postId}`;
    navigator.clipboard.writeText(link);
    toast.success("Post link copied!");
  };

  const toggleSavePost = async () => {
    const postId = post._id;
    const type = "Circle";

    try {
      const token = localStorage.getItem("token");

      // 🔥 Optimistic UI
      setIsSaved((prev) => !prev);

      if (isSaved) {
        await axios.delete(`/saved/${postId}`, {
          data: { type },
          headers: { Authorization: `${token}` },
        });
        toast.success("Removed from saved");
      } else {
        await axios.post(
          `/saved/${postId}`,
          { type },
          {
            headers: { Authorization: `${token}` },
          }
        );
        toast.success("Post saved");
      }
    } catch (error) {
      // ❌ revert on failure
      setIsSaved((prev) => !prev);
      console.error("toggle save error:", error);
      toast.error("Failed to update saved post");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={post.author?.profilePicture?.url || "/default-avatar.png"}
              alt={post.author?.username || "User"}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-gray-100"
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">
              {post.author?.username}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>{getTimeAgo(post.createdAt)}</span>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
          <EllipsisVertical size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        {post.title && (
          <h3 className="font-bold text-lg mb-2 text-gray-900">{post.title}</h3>
        )}
        {post.content && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {post.content}
          </p>
        )}

        {/* Display attachments */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="mt-4 space-y-3">
            {post.attachments.map((file: any, idx: number) => (
              <div key={idx}>
                {file.fileType === "image" ? (
                  <Image
                    src={file.url}
                    alt="Post attachment"
                    width={500}
                    height={300}
                    className="rounded-lg border border-gray-100 object-cover w-full max-h-100"
                  />
                ) : file.fileType === "video" ? (
                  <video
                    controls
                    className="rounded-lg border border-gray-100 w-full max-h-100"
                  >
                    <source src={file.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline text-sm"
                  >
                    View Attachment
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            {/* ❤️ Like Button */}
            <button
              onClick={() => handleLikePost(post._id)}
              className="flex items-center gap-2 text-gray-600 transition-colors group"
            >
              <Heart
                size={22}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  liked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-600"
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  liked ? "text-red-500" : "text-gray-600"
                }`}
              >
                {likeCount}
              </span>
            </button>

            {/* 💬 Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors group"
            >
              <MessageCircle
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium">
                {post.commentCount || 0}
              </span>
            </button>

            {/* 🔗 Share */}
            <button
              onClick={() => handleShare(post._id)}
              className="text-gray-600 hover:text-green-600 transition-colors group"
            >
              <Share2
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>

          {/* 🔖 Bookmark */}
          <button
            onClick={toggleSavePost}
            className={`transition-colors group ${
              isSaved ? "text-green-600" : "text-gray-600 hover:text-yellow-600"
            }`}
          >
            <Bookmark
              size={20}
              className={`transition-transform group-hover:scale-110 ${
                isSaved ? "fill-green-600 text-green-600" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <CommentModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          postId={post._id}
          circleId={selectedCircle._id}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
};

export default CirclePostCard;
