import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio, Form, Button, DatePicker, Select } from "antd";
import Image from "next/image";
import images from "@/assets/images";
import { uploadImage } from "@/components/utils/Upload";
import { UpdateCategory } from "@/api/admin/UpdateCategory";
import { CloudUploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sxStyle = {
  "& .MuiDialog-container:hover": {
    cursor: "pointer",
  },
  "& .MuiPaper-root": {
    zIndex: "1002",

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

function checkNullValues(obj) {
  const { image, name } = obj;
  return name !== null;
}
export default function EditCateDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { cate, updateCate } = props;
  const [avatarSrc, setAvatarSrc] = useState();

  //Refs
  const messageRef = React.useRef();
  const inputFileRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    // console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        // console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);

        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (checkNullValues(cate)) {
  //     messageRef.current.style.display = "none";
  //     let { name, image } = cate;
  //     let temp = { name, image };
  //     const message = UpdateCategory(cate.category_id, temp, props.token);
  //     console.log(message);
  //     // console.log(temp);
  //     window.location.reload();
  //   } else {
  //     messageRef.current.style.display = "block";
  //   }
  // };

  const handleCloseDialog = () => {
    props.handleClose();
    setAvatarSrc(null);
  };

  const onFinish = async (values) => {
    let final = {};
    if (avatarSrc) {
      final = { ...values, image: avatarSrc };
    } else {
      final = { ...values, image: cate.image };
    }
    const message = await UpdateCategory(cate.category_id, final, props.token);
    await props.mutating();
    setAvatarSrc(null);
    handleCloseDialog();
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Mời nhập lại thông tin");
  };

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  // States from parent component
  if (cate)
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          onClose={props.handleClose}
          open={props.isOpen}
          sx={sxStyle}
          className={roboto.className}
        >
          <DialogTitle className={Styles["add-User-dialog-title-container"]}>
            <span className={Styles["add-User-dialog-title-wrapper"]}>
              CHỈNH SỬA DANH MỤC
            </span>
            <div
              className={Styles["close-icon-wrapper"]}
              onClick={props.handleClose}
            >
              <CancelOutlinedIcon />
            </div>
          </DialogTitle>

          <DialogContent dividers>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={Styles["add-user-form-container"]}
              initialValues={{
                category_id: cate.category_id,
                name: cate.name,
              }}
            >
              <div
                className={Styles["add-user-field-container"]}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <span className={Styles["add-user-field-label"]}>Hình ảnh</span>
                <div
                  className={Styles["img-container"]}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    ref={inputFileRef}
                    accept="image/*"
                    style={{ backgroundColor: "white", display: " none" }}
                  />
                  <Button
                    onClick={handlingClickUpload}
                    type="primary"
                    icon={<CloudUploadOutlined />}
                  >
                    Upload image
                  </Button>
                  {avatarSrc != null ? (
                    <Image
                      width={150}
                      height={150}
                      alt=""
                      priority
                      src={avatarSrc}
                    />
                  ) : (
                    <>
                      {cate.image != null ? (
                        <Image
                          width={150}
                          height={150}
                          alt=""
                          priority
                          src={cate.image}
                        />
                      ) : (
                        <Image
                          width={150}
                          height={150}
                          alt=""
                          priority
                          src={images.nonImg}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>ID: </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="category_id"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="ID" disabled />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Tên Danh mục:{" "}
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên danh mục chính",
                    },
                  ]}
                >
                  <Input placeholder="Tên danh mục" />
                </Form.Item>
              </div>

              <div
                className={Styles["add-user-field-submit-container"]}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  textAlign: "center",
                  color: "red",
                  display: "none",
                }}
                ref={messageRef}
              >
                Vui lòng nhập đầy đủ thông tin
              </div>
              <div className={Styles["add-user-field-submit-container"]}>
                <span
                  className={Styles["add-user-field-cancle-btn"]}
                  onClick={props.handleClose}
                >
                  Huỷ
                </span>
                <button className={Styles["add-user-field-submit-btn"]}>
                  Cập nhật
                </button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}
