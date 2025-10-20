import React, { useState } from "react";
import { X } from "lucide-react";
import { BiLoaderCircle, BiWorld } from "react-icons/bi";
import { TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const CreateCircleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    type: "",
    accessType: "",
    accessFee: "",
    investorDesc: "",
    tags: [] as string[],
    icon: null as File | null,
    iconPreview: "",
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormdata({
        ...formdata,
        icon: file,
        iconPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formdata.tags.includes(tagInput.trim())) {
      setFormdata({
        ...formdata,
        tags: [...formdata.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormdata({
      ...formdata,
      tags: formdata.tags.filter((t) => t !== tag),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCreateCircle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("description", formdata.description);
      data.append("type", formdata.type);
      data.append("accessType", formdata.accessType);
      data.append("accessFee", formdata.accessFee);
      data.append("investorDesc", formdata.investorDesc);
      data.append("tags", JSON.stringify(formdata.tags));
      if (formdata.icon) data.append("icon", formdata.icon);

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
      } else toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto mt-10 mb-10 scrollbar-thin scrollbar-thumb-gray-300">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {step === "form" ? (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Create Circle
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Build your investment community and share insights
            </p>

            <form className="space-y-4">
              {/* Circle Name */}
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

              {/* Description */}
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

              {/* Circle Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Circle Tags <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="e.g. Real Estate"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#2E8B57] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-[#0A2540] text-white px-4 py-2 rounded-md hover:bg-[#0d2f57] text-sm"
                  >
                    Add
                  </button>
                </div>

                {/* Tag Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formdata.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Circle Type <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col gap-3 mt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
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
                    <BiWorld className="text-[#2E8B57]" />
                    Public Circle
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
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
                    <TbLockAccess className="text-[#2E8B57]" />
                    Private Circle
                  </label>
                </div>
              </div>

              {/* Access Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Access Type
                </label>
                <div className="flex flex-col gap-3 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="accessType"
                      value="one-time"
                      checked={formdata.accessType === "one-time"}
                      onChange={(e) =>
                        setFormdata({
                          ...formdata,
                          accessType: e.target.value,
                        })
                      }
                      className="accent-[#2E8B57]"
                    />
                    One-Time Payment
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="accessType"
                      value="monthly"
                      checked={formdata.accessType === "monthly"}
                      onChange={(e) =>
                        setFormdata({
                          ...formdata,
                          accessType: e.target.value,
                        })
                      }
                      className="accent-[#2E8B57]"
                    />
                    Monthly Subscription
                  </label>
                </div>
              </div>

              {/* Access Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Access Fee
                </label>
                <input
                  type="text"
                  placeholder="Enter access fee amount e.g ₦5000"
                  value={formdata.accessFee}
                  onChange={(e) =>
                    setFormdata({ ...formdata, accessFee: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Investor Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description for Investors
                </label>
                <textarea
                  placeholder="Gain access to exclusive insights and strategies..."
                  rows={2}
                  value={formdata.investorDesc}
                  onChange={(e) =>
                    setFormdata({ ...formdata, investorDesc: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Upload */}
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
                type="button"
                onClick={() => setStep("preview")}
                className="w-full bg-[#0A2540] text-white py-2 rounded-lg hover:bg-[#0d2f57] transition"
              >
                Preview
              </button>
            </form>
          </>
        ) : (
          <>
            {/* PREVIEW SECTION */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Preview Circle
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Circle Name</h3>
                <p className="text-gray-700 text-sm">{formdata.name}</p>
              </div>

              <div>
                <h3 className="font-semibold">Circle Description</h3>
                <p className="text-gray-700 text-sm">{formdata.description}</p>
              </div>

              <div className="border rounded-lg p-3 bg-gray-50">
                <p className="text-sm font-medium capitalize">
                  {formdata.type === "private"
                    ? "Private Circle"
                    : "Public Circle"}
                </p>
                <p className="text-sm mt-1">
                  {formdata.accessType === "monthly"
                    ? "Monthly Subscription"
                    : "One-Time Payment"}{" "}
                  — <strong>Access Fee:</strong> ₦{formdata.accessFee}
                </p>
                <p className="text-sm mt-2">{formdata.investorDesc}</p>
              </div>

              {formdata.iconPreview && (
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Circle Icon/Logo
                  </h3>
                  <Image
                    src={formdata.iconPreview}
                    alt="Circle Icon"
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("form")}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
              >
                Back
              </button>

              <button
                onClick={handleCreateCircle}
                disabled={loading}
                className="px-5 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0d2f57] text-sm flex items-center justify-center"
              >
                {loading ? (
                  <BiLoaderCircle size={20} className="animate-spin" />
                ) : (
                  "Create Circle"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCircleModal;
