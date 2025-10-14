/* eslint-disable @typescript-eslint/no-explicit-any */
// CirclePostCard.tsx
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

const CirclePostCard = ({
  post,
  selectedCircle,
  getTimeAgo,
}: // refreshPosts,
any) => {
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [showComments, setShowComments] = useState(false);

  const handleLikePost = async (postId: string) => {
    try {
      await axios.post(
        `/circle/post/like?postId=${postId}`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      // refreshPosts(selectedCircle._id);
    } catch {
      toast.error("Failed to like post");
    }
  };

  const handleShare = (postId: string) => {
    const link = `${window.location.origin}/circle/post/${postId}`;
    navigator.clipboard.writeText(link);
    toast.success("Post link copied!");
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
                    className="rounded-lg border border-gray-100 object-cover w-full max-h-[25rem]"
                  />
                ) : file.fileType === "video" ? (
                  <video
                    controls
                    className="rounded-lg border border-gray-100 w-full max-h-[25rem]"
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
            <button
              onClick={() => handleLikePost(post._id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group"
            >
              <Heart
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium">{post.likeCount || 0}</span>
            </button>
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
          <button className="text-gray-600 hover:text-yellow-600 transition-colors group">
            <Bookmark
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Comments */}
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
