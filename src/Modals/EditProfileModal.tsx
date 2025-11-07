/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import Image from "next/image";
import noface from "../../assets/blank-profile-picture.webp";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const EditProfileModal = ({ onClose, user, onSave }: any) => {
  const [profileImage, setProfileImage] = useState<string>(
    user?.avatar || noface.src
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    username: user?.username || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewURL = URL.createObjectURL(file);
      setProfileImage(previewURL);
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Updating profile...");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (selectedFile) formDataToSend.append("avatar", selectedFile);

      const res = await axios.put("/users/profile", formDataToSend, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.content.user;
      toast.success("Profile updated successfully!");

      // ✅ Trigger parent update immediately
      if (onSave) onSave(updatedUser);
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(msg);
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-[500px] rounded-xl p-6 md:p-8 shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-all text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={profileImage}
              alt="profile"
              fill
              className="rounded-full object-cover border border-gray-300"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-sm bg-[#2E8B57] text-white px-4 py-1.5 rounded-md hover:bg-[#256a45] transition-all"
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B57] resize-none"
              placeholder="Write something about yourself"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#2E8B57] text-white px-5 py-2 rounded-md hover:bg-[#256a45] transition-all text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
