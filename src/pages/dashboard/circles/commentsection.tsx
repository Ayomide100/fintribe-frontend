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
  const [input, setInput] = useState(""); // top-level comment input
  const [replyInput, setReplyInput] = useState(""); // reply input for selected comment
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null); // comment id we are replying to
  const [showAll, setShowAll] = useState(false);

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `/circle/post/single?circleId=${circleId}&postId=${postId}&page=1&limit=50`,
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
    } catch (err) {
      toast.error("Failed to load comments");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!comments[postId]) fetchComments();
  }, []);

  // Post either a top-level comment or a reply (uses parentCommentId)
  // Post either a top-level comment or a reply (uses parentCommentId)
  const handlePost = async (parentCommentId?: string) => {
    const content = parentCommentId ? replyInput : input;
    if (!content || !content.trim()) return;

    try {
      setLoading(true);

      const payload: any = {
        content,
        parentCommentId: parentCommentId || null, // ✅ correct field name
      };

      const res = await axios.post(
        `/circle/post/comment?circleId=${circleId}&postId=${postId}`,
        payload,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      // ✅ fix: backend returns "content", not "comment"
      const newComment = res.data?.content;

      setComments((prev) => {
        const current = prev[postId] || [];

        if (parentCommentId) {
          // Add reply to the parent comment's replies array
          return {
            ...prev,
            [postId]: current.map((c: any) =>
              c._id === parentCommentId
                ? { ...c, replies: [newComment, ...(c.replies || [])] }
                : c
            ),
          };
        } else {
          // Add top-level comment
          return {
            ...prev,
            [postId]: [newComment, ...current],
          };
        }
      });

      // Reset inputs
      if (parentCommentId) {
        setReplyInput("");
        setReplyTo(null);
        toast.success("Reply posted");
      } else {
        setInput("");
        toast.success("Comment posted");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const days = Math.floor(seconds / (3600 * 24));

    // ✅ If more than 10 days, show formatted date instead
    if (days > 10) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  };

  // Like comment or reply (optimistic update)
  const handleLikeComment = async (commentId: string, replyId?: string) => {
    try {
      const url = `/circle/post/comment/like?circleId=${circleId}&postId=${postId}&commentId=${commentId}${
        replyId ? `&replyId=${replyId}` : ""
      }`;

      await axios.post(
        url,
        {},
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );

      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).map((c: any) => {
          // like top-level comment
          if (c._id === commentId && !replyId) {
            return {
              ...c,
              hasLiked: !c.hasLiked,
              likeCount: (c.likeCount || 0) + (c.hasLiked ? -1 : 1),
            };
          }

          // like a reply
          if (c._id === commentId && replyId) {
            return {
              ...c,
              replies: (c.replies || []).map((r: any) =>
                r._id === replyId
                  ? {
                      ...r,
                      hasLiked: !r.hasLiked,
                      likeCount: (r.likeCount || 0) + (r.hasLiked ? -1 : 1),
                    }
                  : r
              ),
            };
          }

          return c;
        }),
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to like comment");
    }
  };

  const displayedComments = showAll
    ? comments[postId] || []
    : (comments[postId] || []).slice(0, 2);

  return (
    <div className="border-t border-gray-100 p-4 bg-gray-50">
      {/* Comments List */}
      <div className="space-y-4">
        {(!comments[postId] || comments[postId].length === 0) && (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first!
          </p>
        )}

        {displayedComments.map((comment: any) => (
          <div key={comment._id} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-semibold uppercase">
                {comment.author?.username?.[0] || "U"}
              </span>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 text-sm">
                    {comment.author?.username}
                  </p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(comment.createdAt)}
                  </p>
                </div>

                <p className="text-gray-700 text-sm mt-2">{comment.content}</p>
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
                  onClick={() =>
                    setReplyTo((prev) =>
                      prev === comment._id ? null : comment._id
                    )
                  }
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500"
                >
                  <MessageCircle size={14} /> Reply
                </button>
              </div>

              {/* Replies list */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-3 space-y-2">
                  {comment.replies.map((reply: any) => (
                    <div
                      key={reply._id}
                      className="bg-gray-100 p-2 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-xs text-gray-800">
                          {reply.author?.username}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {timeAgo(reply.createdAt)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {reply.content}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            handleLikeComment(comment._id, reply._id)
                          }
                          className={`flex items-center gap-1 text-[11px] ${
                            reply.hasLiked ? "text-red-500" : "text-gray-500"
                          }`}
                        >
                          <Heart size={12} /> {reply.likeCount || 0}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input shown inline under targeted comment */}
              {replyTo === comment._id && (
                <div className="ml-8 mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button
                    onClick={() => handlePost(comment._id)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition"
                  >
                    <Send size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      {comments[postId] && comments[postId].length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-blue-600 font-medium mt-3 hover:underline"
        >
          View all comments
        </button>
      )}

      {/* Main top-level comment input (visible only when not replying) */}
      {!replyTo && (
        <div className="mt-5 flex items-center gap-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => handlePost()}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition"
          >
            <Send size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
