import Axios, { isAxiosError } from "axios";

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Axios error:", error.message);
    } else {
      // Non-Axios error
      console.error("Unknown error:", error);
    }
    return Promise.reject(error);
  }
);

export default axios;
