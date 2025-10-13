/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { X } from "lucide-react";
import CommentsSection from "./commentsection";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  circleId: string;
  comments: Record<string, any[]>;
  setComments: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  circleId,
  comments,
  setComments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          <CommentsSection
            postId={postId}
            circleId={circleId}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
