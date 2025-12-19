/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  post: any;
  onClose: () => void;
}

const PostDetailsModal = ({ post, onClose }: Props) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-xl p-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* USER */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={post.user.avatar.url}
            width={45}
            height={45}
            className="rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <p className="font-semibold capitalize">{post.user.fullname}</p>
            <p className="text-sm text-gray-500">@{post.user.username}</p>
          </div>
        </div>

        {/* CONTENT */}
        <p className="mb-4 text-gray-800">{post.content}</p>

        {/* MEDIA */}
        {post.media?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {post.media.map((img: any) => (
              <Image
                key={img.id}
                src={img.url}
                alt="post-media"
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}
        {/* COMMENTS SECTION */}
        <div className="mt-6">
          <p className="font-semibold text-gray-800 mb-3">
            Comments ({post.comments.length})
          </p>

          {post.comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {post.comments.map((comment: any) => (
                <div key={comment._id} className="flex gap-3">
                  {/* Avatar */}
                  <Image
                    src={comment.user?.avatar?.url || "/default-avatar.png"}
                    width={35}
                    height={35}
                    className="rounded-full object-cover"
                    alt="comment-avatar"
                  />

                  {/* Comment body */}
                  <div className="bg-gray-100 rounded-lg px-3 py-2 w-full">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm capitalize">
                        {comment.user?.fullname || "User"}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
          <p>❤️ {post.likes.length} likes</p>
          <p>💬 {post.comments.length} comments</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsModal;
