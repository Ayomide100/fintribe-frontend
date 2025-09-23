import React, { useState } from "react";
import { X } from "lucide-react";
import { BiLoaderCircle, BiWorld } from "react-icons/bi";
import { TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const CreateCircleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    type: "",
    icon: null as File | null,
  });
  const [loading, setloading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormdata({ ...formdata, icon: e.target.files[0] });
    }
  };

  const handleCreatCircle = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setloading(true);
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("description", formdata.description);
      data.append("type", formdata.type);
      if (formdata.icon) {
        data.append("icon", formdata.icon);
      }

      const res = await axios.post("/circle", data, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      toast.success("Circle created successfully!");
      onClose(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Create Circle
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Build your investment community and share insights
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleCreatCircle}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Circle Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g PropTop Investors"
              value={formdata.name}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
              className="w-full border border-[#6E6E6E] rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Circle Description <span className="text-red-600">*</span>
            </label>
            <textarea
              placeholder="Describe what this circle is about..."
              rows={3}
              value={formdata.description}
              onChange={(e) =>
                setFormdata({ ...formdata, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Circle Type <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col gap-3 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="type"
                  value="public"
                  checked={formdata.type === "public"}
                  onChange={(e) =>
                    setFormdata({ ...formdata, type: e.target.value })
                  }
                  className="accent-[#2E8B57]"
                />
                Public Circle
                <BiWorld className="text-[#2E8B57]" />
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="type"
                  value="private"
                  checked={formdata.type === "private"}
                  onChange={(e) =>
                    setFormdata({ ...formdata, type: e.target.value })
                  }
                  className="accent-[#2E8B57]"
                />
                Private Circle
                <TbLockAccess className="text-[#2E8B57]" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Circle Icon/Logo (Optional)
            </label>
            <label className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {formdata.icon ? (
                <span className="text-gray-700">{formdata.icon.name}</span>
              ) : (
                "Upload Circle Icon/Logo"
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A2540] text-white py-2 rounded-lg shadow hover:bg-[#0d2f57] transition"
          >
            {loading ? (
              <span className="flex justify-center text-white items-center">
                <BiLoaderCircle className="mr-2 animate-spin" size={22} />
              </span>
            ) : (
              <span> Create Circle</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCircleModal;
