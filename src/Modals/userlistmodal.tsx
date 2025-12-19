import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import noface from "../../assets/notfiyimg.png";

interface User {
  _id: string;
  fullname: string;
  username: string;
  avatar?: {
    url?: string;
  };
}

interface Props {
  title: string;
  users: User[];
  onClose: () => void;
}

const UserListModal: React.FC<Props> = ({ title, users, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[420px] max-h-[80vh] rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto max-h-[65vh]">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <Image
                    src={user.avatar?.url || noface}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    alt="avatar"
                  />
                  <div>
                    <p className="font-medium capitalize">{user.fullname}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
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

export default UserListModal;
