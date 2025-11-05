/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export const useJoinPrivateCircle = () => {
  const joinPrivateCircle = async (circleId: string) => {
    const loadingId = toast.loading("Initializing payment...");

    try {
      // Step 1️⃣ Initialize Payment
      const initRes = await axios.post(
        `/circle/${circleId}/initialize-payment`,
        {},
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      const { authorizationUrl, reference } = initRes.data?.content || {};

      if (!authorizationUrl || !reference) {
        toast.error("Unable to initialize payment");
        return;
      }

      // Step 2️⃣ Redirect to Payment Page
      window.open(authorizationUrl, "_blank");

      // Step 3️⃣ Confirm Payment on Backend
      toast.loading("Processing payment...", { id: loadingId });
      await axios.post(
        `/circle/${circleId}/join-private`,
        { paymentReference: reference },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      toast.success("Successfully joined private circle!");
    } catch (error: any) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";
        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;
        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return { joinPrivateCircle };
};
