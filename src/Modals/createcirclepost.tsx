import React, { useRef } from "react";
import toast from "react-hot-toast";
import { X, ImagePlus } from "lucide-react";
import Image from "next/image";

interface CreateCirclePostProps {
  selectedCircle: { _id: string; name: string } | null;
  newPost: {
    title: string;
    content: string;
    images: File[];
    isPinned: boolean;
    isAnnouncement: boolean;
  };
  setNewPost: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      images: File[];
      isPinned: boolean;
      isAnnouncement: boolean;
    }>
  >;
  handleCreatePost: (circleId: string) => void;
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCirclePost: React.FC<CreateCirclePostProps> = ({
  selectedCircle,
  newPost,
  setNewPost,
  handleCreatePost,
  setShowCreateForm,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = newPost.images.length + files.length;

    if (total > 3) {
      toast.error("You can upload a maximum of 3 images");
      return;
    }

    setNewPost({ ...newPost, images: [...newPost.images, ...files] });
  };

  const removeImage = (index: number) => {
    const updated = [...newPost.images];
    updated.splice(index, 1);
    setNewPost({ ...newPost, images: updated });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={() => setShowCreateForm(false)}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={() => setShowCreateForm(false)}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
        >
          <X size={18} className="text-gray-700" />
        </button>

        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Create a Post
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          in{" "}
          <span className="font-medium text-gray-700">
            {selectedCircle?.name}
          </span>
        </p>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Post title (optional)"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full border border-gray-300 focus:border-[#226B44] rounded-lg p-2 mb-3 text-sm focus:outline-none"
        />

        {/* Content */}
        <textarea
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full border border-gray-300 focus:border-[#226B44] rounded-lg p-3 mb-4 text-sm min-h-[120px] focus:outline-none"
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-full gap-2 border border-dashed border-gray-400 rounded-lg p-3 mb-4 text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          <ImagePlus size={16} />
          Upload Images ({newPost.images.length}/3)
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Image Previews */}
        {newPost.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {newPost.images.map((img, index) => {
              const previewUrl = URL.createObjectURL(img);
              return (
                <div
                  key={index}
                  className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200"
                >
                  <Image
                    src={previewUrl}
                    alt={`preview-${index}`}
                    className="object-cover"
                    fill
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Options */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={newPost.isPinned}
              onChange={(e) =>
                setNewPost({ ...newPost, isPinned: e.target.checked })
              }
              className="accent-[#226B44]"
            />
            Pinned
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={newPost.isAnnouncement}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  isAnnouncement: e.target.checked,
                })
              }
              className="accent-[#226B44]"
            />
            Announcement
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            onClick={() => setShowCreateForm(false)}
            className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedCircle && selectedCircle._id) {
                handleCreatePost(selectedCircle._id);
              } else {
                toast.error("No circle selected");
              }
            }}
            className="bg-[#226B44] text-white text-sm px-6 py-2 rounded-md hover:bg-[#1B5736] transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCirclePost;
