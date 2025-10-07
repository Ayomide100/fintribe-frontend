/* eslint-disable @typescript-eslint/no-explicit-any */
// CommentItem.tsx
import React from "react";
import Image from "next/image";

type CommentItemProps = {
  comment: any;
  onReply: (parentId: string) => void;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  return (
    <div className="group">
      <div className="flex items-start gap-3">
        <Image
          src={comment.author?.avatar || "/default-avatar.png"}
          alt={comment.author?.username || "User"}
          width={36}
          height={36}
          className="rounded-full ring-2 ring-gray-200"
        />
        <div className="flex-1">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-gray-900">
              {comment.author?.username}
            </p>
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {comment.content}
            </p>

            {comment.file?.url && (
              <div className="mt-2">
                <Image
                  src={comment.file.url}
                  alt="comment-img"
                  width={240}
                  height={240}
                  className="rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => onReply(comment._id)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Reply
          </button>

          {/* Replies */}
          {comment.replies?.length > 0 && (
            <div className="ml-6 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
              {comment.replies.map((reply: any) => (
                <div key={reply._id} className="flex gap-2 items-start">
                  <Image
                    src={reply.author?.avatar || "/default-avatar.png"}
                    alt={reply.author?.username || "User"}
                    width={28}
                    height={28}
                    className="rounded-full ring-2 ring-gray-200"
                  />
                  <div className="bg-gray-50 rounded-lg p-2.5 flex-1 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-900">
                      {reply.author?.username}
                    </p>
                    <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
