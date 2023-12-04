import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import { Input, Radio } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { uploadImage } from "@/components/utils/Upload";
import { AddOption } from "@/api/vendor/AddOption";
import { Toaster } from "react-hot-toast";
const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function AddOptionDialog(props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = useState({
    name: null,
    image: null,
  });
  const [name, setName] = useState(null);
  const messageRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sxStyle = {
    "& .MuiDialog-container:hover": {
      cursor: "pointer",
    },
    "& .MuiPaper-root": {
      cursor: "default",
    },
    "& .MuiTypography-root": {
      padding: "10px 14px 10px 24px",
    },
    "& .MuiDialogActions-root": {
      padding: "24px",
    },
    "&.css-4g2jqn-MuiModal-root-MuiDialog-root": {
      right: 55,
    },
  };

  const [fileList, setFileList] = useState([]);
  const [imgList, setImgList] = useState([]);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    promiseResult
      .then((result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        // setAvatarSrc(imagePath);
        let temp = { ...option, image: imagePath };
        setOption(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handlingChangeName = (e) => {
    setName(e.target.value);
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   console.log(newFileList);
  //   handleFileUpload(newFileList);
  // };

  const handlingSubmit = (event) => {
    event.preventDefault();
    let temp = { ...option, name: name };
    const message = AddOption(props.id, temp, props.token);
    window.location.reload();
    console.log(message);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <React.Fragment>
      <Toaster />
      <Dialog
        onClose={props.handleClose}
        open={props.isOpen}
        sx={sxStyle}
        className={roboto.className}
      >
        <DialogTitle className={Styles["add-User-dialog-title-container"]}>
          <span className={Styles["add-User-dialog-title-wrapper"]}>
            Thêm Phân Loại
          </span>
          <div
            className={Styles["close-icon-wrapper"]}
            onClick={props.handleClose}
          >
            <CancelOutlinedIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <form
            onSubmit={handlingSubmit}
            className={Styles["add-user-form-container"]}
          >
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Hình ảnh:</span>
              <div style={{ display: "flex", gap: "20px" }}>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "center",
                    width: "150px",
                  }}
                />
                {/* <Upload
                  listType="picture-card"
                  onChange={handleChange}
                  maxCount={1}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload> */}
                {option.image ? (
                  <>
                    <Image
                      style={{ borderRadius: "5px" }}
                      src={option.image}
                      alt=""
                      priority
                      width={100}
                      height={100}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Tên phân loại:{" "}
              </span>
              <Input
                onChange={handlingChangeName}
                placeholder="Tên phân loại"
                style={{
                  width: "100%",
                }}
              />
            </div>

            <div className={Styles["message-container"]} ref={messageRef}>
              <span
                style={{ display: "none", fontWeight: "400", color: "red" }}
              >
                Vui lòng nhập đủ thông tin
              </span>
            </div>

            <div className={Styles["add-user-field-submit-container"]}>
              <span
                className={Styles["add-user-field-cancle-btn"]}
                onClick={props.handleClose}
              >
                Huỷ
              </span>
              <button
                type="submit"
                className={Styles["add-user-field-submit-btn"]}
              >
                THÊM
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
