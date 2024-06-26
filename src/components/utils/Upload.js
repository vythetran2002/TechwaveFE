import axios from "axios";
import toast from "react-hot-toast";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/uploadFile",
      formData,
      config
    );
    // toast.success("Uploaded");

    return response.data;
  } catch (error) {
    toast.error("error");
    throw new Error(error.message);
  }
};
