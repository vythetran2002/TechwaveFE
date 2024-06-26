import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";

// Tạo một instance của axios để tái sử dụng
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/uploadFile",
  // "http://localhost:3000/api/uploadFile",
});

const fetcher = async (url, file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Multipart form data để gửi files
    },
  });

  return response.data; // Trả về dữ liệu từ response
};

function useFetchImg(file) {
  // URL endpoint của bạn để nhận file, bạn có thể thêm nó như một tham số nếu cần
  const { data, error } = useSWR(file ? ["/upload", file] : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetchImg;
