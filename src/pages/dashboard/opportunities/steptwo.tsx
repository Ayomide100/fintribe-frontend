import axios from "@/config/axiosconfig";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

interface MediaStepProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const MediaStep: React.FC<MediaStepProps> = () => {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const id = "691300329366e6719a88c8d9";

  const handleUpload = async (index: number, file: File | null) => {
    if (!file) return;

    const toastId = toast.loading("Uploading...");

    try {
      const formData = new FormData();
      formData.append("media", file);

      await axios.put(`/opportunity/${id}/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // Update preview
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);

      toast.success("Upload successful");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(message);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  const addMoreImageBox = () => {
    setImages((prev) => [...prev, null]);
  };

  return (
    <div className="bg-white border rounded-md p-6 shadow-sm">
      <p className="text-sm font-medium mb-2">Project Gallery</p>
      <p className="text-xs text-gray-500 mb-6">
        Upload up to 4 high-quality images (JPG, PNG, max 5MB each)
      </p>

      {/* Upload Grid */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        {images.map((img, index) => (
          <label
            key={index}
            className="border-2 border-dashed rounded-md flex flex-col items-center justify-center py-10 text-gray-500 cursor-pointer"
          >
            {img ? (
              <Image
                src={img}
                alt="uploaded preview"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <>
                <div className="text-2xl mb-2">
                  <Upload />
                </div>
                <span className="text-sm font-medium">Upload Image</span>
                <span className="text-xs">
                  Click to upload or drag and drop
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleUpload(index, e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        ))}
      </div>

      {/* Add More Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={addMoreImageBox}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-600 text-sm"
        >
          <span className="text-lg">＋</span> Upload more images
        </button>
      </div>
    </div>
  );
};

export default MediaStep;
