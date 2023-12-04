const axios = require("axios");

export const addFollowVendor = async (id, token) => {
  const data = {
    vender_id: id,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/folow/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Xử lý kết quả response ở đây (nếu cần)
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
