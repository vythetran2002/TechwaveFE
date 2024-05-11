import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import images from "@/assets/images";
import Image from "next/image";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;

    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        // let temp = { ...account, avatar: imagePath };
        // setAccount(temp);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
  }
  return (
    <>
      <Toaster />
      {avatarSrc != null ? (
        <>
          <Image
            src={avatarSrc}
            width={150}
            height={150}
            alt=""
            priority
            style={{ borderRadius: "50%" }}
          />
        </>
      ) : (
        <>
          <Image
            src={images.nonAvatar}
            width={150}
            height={150}
            alt=""
            priority
            style={{ borderRadius: "50%" }}
          />
        </>
      )}
      <input
        onChange={handleFileUpload}
        type="file"
        accept=".jpg, .png, image/jpeg, image/png"
      />
    </>
  );
};
export default App;
