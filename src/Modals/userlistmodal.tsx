import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import noface from "../../assets/notfiyimg.png";

interface UserProfileResponse {
  user: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    bio: string | null;
    avatar: { url?: string } | null;
    createdAt: string;
  };
  followers: number;
  followings: number;
  userPosts: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
  }[];
}

interface Props {
  data: UserProfileResponse;
  onClose: () => void;
  title: string;
}

const ViewUserProfileModal: React.FC<Props> = ({ data, onClose, title }) => {
  const { user, followers, followings, userPosts } = data;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[95%] md:w-[520px] max-h-[85vh] rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto max-h-[75vh] space-y-6">
          {/* USER INFO */}
          <div className="flex items-center gap-4">
            <Image
              src={user.avatar?.url || noface}
              width={64}
              height={64}
              className="rounded-full object-cover border"
              alt="avatar"
            />
            <div>
              <p className="font-semibold text-lg capitalize">
                {user.fullname}
              </p>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="text-xs text-gray-400">
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* BIO */}
          <p className="text-sm text-gray-600">
            {user.bio || "No bio provided."}
          </p>

          {/* STATS */}
          <div className="flex justify-around border rounded-lg py-3">
            <div className="text-center">
              <p className="font-semibold">{followers}</p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{followings}</p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{userPosts.length}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
          </div>

          {/* POSTS */}
          <div className="space-y-4">
            <p className="font-semibold text-sm">Posts</p>

            {userPosts.length === 0 ? (
              <p className="text-sm text-gray-500">No posts yet.</p>
            ) : (
              userPosts.map((post) => (
                <div
                  key={post._id}
                  className="border rounded-lg p-3 hover:bg-gray-50"
                >
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfileModal;
