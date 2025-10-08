/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "@/config/axiosconfig";
import { Send, Heart, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

interface CommentSectionProps {
  postId: string;
  circleId: string;
  comments: Record<string, any[]>;
  setComments: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}

const CommentsSection: React.FC<CommentSectionProps> = ({
  postId,
  circleId,
  comments,
  setComments,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch comments when opened
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `/circle/post/single?circleId=${circleId}&postId=${postId}&page=1&limit=5`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      const postData = res.data?.content?.post;
      const postComments = postData?.comments || [];

      setComments((prev) => ({
        ...prev,
        [postId]: postComments,
      }));
    } catch {
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    if (!comments[postId]) fetchComments();
  }, []);

  // Handle posting a new comment
  const handleComment = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `/circle/post/comment?circleId=${circleId}&postId=${postId}`,
        { content: input, parentId: replyTo || null },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      setComments((prev) => ({
        ...prev,
        [postId]: [res.data.comment, ...(prev[postId] || [])],
      }));
      setInput("");
      setReplyTo(null);
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // Handle liking a comment
  // Handle liking a comment or reply
  const handleLikeComment = async (commentId: string, replyId?: string) => {
    try {
      const url = `/circle/post/comment/like?circleId=${circleId}&postId=${postId}&commentId=${commentId}${
        replyId ? `&replyId=${replyId}` : ""
      }`;

      const res = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);

      // Update UI instantly (optimistic update)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((c) => {
          // If this is the comment being liked
          if (c._id === commentId && !replyId) {
            const updated = {
              ...c,
              hasLiked: !c.hasLiked,
              likeCount: (c.likeCount || 0) + (c.hasLiked ? -1 : 1),
            };
            return updated;
          }

          // If this is a reply being liked
          if (c._id === commentId && replyId) {
            const updatedReplies = c.replies.map((r: any) =>
              r._id === replyId
                ? {
                    ...r,
                    hasLiked: !r.hasLiked,
                    likeCount: (r.likeCount || 0) + (r.hasLiked ? -1 : 1),
                  }
                : r
            );
            return { ...c, replies: updatedReplies };
          }

          return c;
        }),
      }));
    } catch {
      toast.error("Failed to like");
    }
  };

  const displayedComments = showAll
    ? comments[postId] || []
    : (comments[postId] || []).slice(0, 2);

  return (
    <div className="border-t border-gray-100 p-4 bg-gray-50">
      {/* Comments List */}
      <div className="space-y-4">
        {displayedComments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first!
          </p>
        ) : (
          displayedComments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-semibold uppercase">
                  {comment.author?.username?.[0] || "U"}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">
                    {comment.content.author?.username}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 ml-2">
                  <button
                    onClick={() => handleLikeComment(comment._id)}
                    className={`flex items-center gap-1 text-xs ${
                      comment.hasLiked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <Heart size={14} /> {comment.likeCount || 0}
                  </button>
                  <button
                    onClick={() => setReplyTo(comment._id)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500"
                  >
                    <MessageCircle size={14} /> Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 mt-3 space-y-2">
                    {comment.replies.map((reply: any) => (
                      <div
                        key={reply._id}
                        className="bg-gray-100 p-2 rounded-lg border border-gray-200"
                      >
                        <p className="font-semibold text-xs text-gray-800">
                          {reply.author?.username}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All */}
      {comments[postId] && comments[postId].length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-blue-600 font-medium mt-3 hover:underline"
        >
          View all comments
        </button>
      )}

      {/* Comment Input */}
      <div className="mt-5 flex items-center gap-3">
        <input
          type="text"
          placeholder={
            replyTo ? "Replying to a comment..." : "Write a comment..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={handleComment}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
