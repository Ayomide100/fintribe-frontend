/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export const useJoinCircle = () => {
  const joinCircle = async (circleId: string) => {
    const loadingId = toast.loading("Joining circle...");

    try {
      await axios.post(
        `/circle/${circleId}/join`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      toast.success("Joined successfully!");
    } catch (error: any) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";
        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;
        toast.error(errorMsg);
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return { joinCircle };
};
