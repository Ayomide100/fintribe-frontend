/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface MediaStepProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onNext: (data: any) => void;
  onBack: () => void;
}

const MediaStep: React.FC<MediaStepProps> = ({ onNext, onBack }) => {
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [previews, setPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const id = localStorage.getItem("opportunityId");

  // Store file locally and generate preview
  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(file);
    setPreviews(newPreviews);
  };

  const addMoreImageBox = () => {
    setImages((prev) => [...prev, null]);
    setPreviews((prev) => [...prev, null]);
  };

  const handleNext = async () => {
    if (!id) {
      toast.error("Missing opportunity ID");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => {
      if (file) formData.append("media", file);
    });

    if (formData.getAll("media").length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const toastId = toast.loading("Uploading...");

    try {
      await axios.patch(`/opportunity/${id}/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Images uploaded successfully");
      onNext({ images: previews.filter(Boolean) });
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

  return (
    <div className="bg-white border rounded-md p-6 shadow-sm">
      <p className="text-sm font-medium mb-2">Project Gallery</p>
      <p className="text-xs text-gray-500 mb-6">
        Upload up to 4 high-quality images (JPG, PNG, max 5MB each)
      </p>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {previews.map((img, index) => (
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
                handleFileChange(
                  index,
                  e.target.files ? e.target.files[0] : null
                )
              }
            />
          </label>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={addMoreImageBox}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-600 text-sm"
        >
          <span className="text-lg">＋</span> Upload more images
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md border text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-md bg-green-600 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MediaStep;
