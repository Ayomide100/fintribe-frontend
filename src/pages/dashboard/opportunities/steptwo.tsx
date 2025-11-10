import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  function handleUpload(index: number, file: File | null) {
    if (!file) return; // ✅ Guard clause for null
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file); // ✅ file is guaranteed non-null here
    setImages(newImages);
  }

  function addMoreImageBox() {
    setImages((prev) => [...prev, null]);
  }

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
                handleUpload(
                  index,
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
            />
          </label>
        ))}
      </div>

      {/* Add more button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={addMoreImageBox}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-600 text-sm"
        >
          <span className="text-lg">＋</span> Upload more images
        </button>
      </div>

      {/* Guidelines */}
      <div className="bg-gray-50 border rounded-md p-4 text-sm">
        <p className="font-medium mb-2">Media Guidelines</p>
        <ul className="text-xs space-y-1 text-gray-600">
          <li>• Use high-resolution images that clearly show your project</li>
          <li>• Include photos of locations, facilities, or key assets</li>
          <li>• Videos should be professional and under 3 minutes</li>
          <li>• Avoid watermarks or copyrighted content</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-8">
        <button className="px-6 py-2 border rounded-md text-sm">
          Previous
        </button>
        <button className="px-6 py-2 rounded-md text-sm bg-[#0b2447] text-white">
          Next
        </button>
      </div> */}
    </div>
  );
};
export default MediaStep;
