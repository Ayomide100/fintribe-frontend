import React, { useRef } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setShowCreateForm(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold mb-4 text-gray-800 text-lg">
          Create a new post in {selectedCircle?.name}
        </h3>

        <input
          type="text"
          placeholder="Title (optional)"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm"
        />

        <textarea
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 text-sm min-h-[100px]"
        />

        {/* Image Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-dashed border-gray-400 rounded-md p-2 mb-3 text-sm text-gray-600 hover:bg-gray-50"
        >
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

        {/* Image Preview */}
        {newPost.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {newPost.images.map((img, index) => {
              const previewUrl = URL.createObjectURL(img);
              return (
                <div
                  key={index}
                  className="relative w-full h-24 rounded-md overflow-hidden border"
                >
                  <Image
                    src={previewUrl}
                    alt={`preview-${index}`}
                    className=" object-cover"
                    width={100}
                    height={100}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Checkboxes */}
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={newPost.isPinned}
              onChange={(e) =>
                setNewPost({ ...newPost, isPinned: e.target.checked })
              }
            />
            Pinned
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={newPost.isAnnouncement}
              onChange={(e) =>
                setNewPost({
                  ...newPost,
                  isAnnouncement: e.target.checked,
                })
              }
            />
            Announcement
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (selectedCircle && selectedCircle._id) {
                handleCreatePost(selectedCircle._id);
              } else {
                toast.error("No circle selected");
              }
            }}
            className="bg-[#226B44] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1B5736] transition"
          >
            Post
          </button>
          <button
            onClick={() => setShowCreateForm(false)}
            className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCirclePost;
