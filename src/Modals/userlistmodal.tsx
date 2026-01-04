/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import {
  X,
  Users,
  UserPlus,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
} from "lucide-react";
import noface from "../../assets/notfiyimg.png";

const ViewUserProfileModal = ({ data, onClose }: any) => {
  const { user, followers, followings, userPosts } = data;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[95%] md:w-[540px] max-h-[90vh] rounded-xl shadow-xl overflow-hidden relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-emerald-100 p-1 rounded-full"
        >
          <X size={16} />
        </button>

        {/* CONTENT */}
        <div className="px-6 py-8 overflow-y-auto max-h-[90vh]">
          {/* PROFILE */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-1 rounded-full border-2 border-emerald-400">
              <Image
                src={user.avatar?.url || noface}
                width={96}
                height={96}
                alt="avatar"
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">{user.fullname}</p>
              <button className="text-emerald-600 text-sm font-medium">
                Follow
              </button>
            </div>

            <p className="text-sm text-gray-500">@{user.username}</p>

            {/* STATS */}
            <div className="flex gap-12 pt-4">
              <div className="flex flex-col items-center">
                <Users size={18} className="text-emerald-600" />
                <p className="font-semibold text-emerald-600">
                  {followers.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>

              <div className="flex flex-col items-center">
                <UserPlus size={18} className="text-emerald-600" />
                <p className="font-semibold text-emerald-600">
                  {followings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>

            {/* BIO */}
            <p className="text-sm text-gray-500 max-w-md pt-2">
              {user.bio || "No bio provided."}
            </p>
          </div>

          {/* POSTS LABEL */}
          <div className="pt-8 pb-4 border-b">
            <p className="font-semibold text-sm">Posts</p>
          </div>

          {/* POSTS */}
          {/* POSTS */}
          <div className="space-y-6 pt-6">
            {userPosts.map((post: any) => {
              const image = post.attachments?.find(
                (att: any) => att.fileType === "image"
              );

              return (
                <div
                  key={post._id}
                  className="border rounded-xl shadow-sm bg-white overflow-hidden"
                >
                  {/* POST HEADER */}
                  <div className="flex justify-between items-center px-4 py-3">
                    <div className="flex gap-3 items-center">
                      <Image
                        src={user.avatar?.url || noface}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">{user.fullname}</p>
                        <p className="text-xs text-gray-400">
                          Real Estate Expert ·{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <MoreVertical size={18} className="text-gray-400" />
                  </div>

                  {/* TEXT */}
                  <div className="px-4 text-sm text-gray-600 pb-3">
                    {post.content}
                  </div>

                  {/* IMAGE */}
                  {image ? (
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={image.url}
                        alt="post image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-[220px] bg-linear-to-br from-emerald-800 to-emerald-950" />
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-8 px-4 py-3 text-gray-500 text-sm border-t">
                    <div className="flex gap-1 items-center">
                      <Heart size={18} /> {post.likeCount || 0}
                    </div>
                    <div className="flex gap-1 items-center">
                      <MessageCircle size={18} /> {post.commentCount || 0}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Share2 size={18} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfileModal;
