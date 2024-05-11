import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio, Form, Button } from "antd";
import Image from "next/image";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import { CloudUploadOutlined } from "@ant-design/icons";
import images from "@/assets/images";
import { PutOption } from "@/api/vendor/PutOption";

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

export default function AddOptionDialog(props) {
  const [avatarSrc, setAvatarSrc] = useState();
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = useState({
    name: null,
    image: null,
  });
  const [name, setName] = useState(null);

  //Refs
  const messageRef = useRef();
  const inputFileRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAvatarSrc(null);
    props.handleClose();
  };

  const [fileList, setFileList] = useState([]);
  const [imgList, setImgList] = useState([]);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    // console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        // let temp = { ...props.product, image: imagePath };
        // props.updateProduct(temp);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
    // promiseResult
    //   .then((result) => {
    //     const imagePath = result.imagePath;
    //     console.log("imagePath:", imagePath);
    //     setAvatarSrc(imagePath);
    //     let temp = { ...props.product, image: imagePath };
    //     props.updateProduct(temp);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi:", error);
    //   });
  }

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   console.log(newFileList);
  //   handleFileUpload(newFileList);
  // };

  // const handlingSubmit = (event) => {
  //   event.preventDefault();
  //   let temp = { ...option, name: name };
  //   const message = AddOption(props.id, temp, props.token);
  //   // window.location.reload();
  //   props.handleClose();
  //   console.log(message);
  // };

  const onFinish = async (values) => {
    let final = {};

    if (avatarSrc) {
      final = { ...values, image: avatarSrc };
    } else {
      final = { ...values, image: props.option.image };
    }
    const message = await PutOption(
      props.productId,
      props.option.id,
      final,
      props.token
    );
    await props.mutate();
    handleClose();
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Mời nhập lại thông tin");
  };

  // useEffect(() => {
  //   console.log(name);
  // }, [name]);

  return (
    <React.Fragment>
      <Toaster />
      <Dialog
        onClose={handleClose}
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
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={Styles["add-user-form-container"]}
            initialValues={{
              name: props.option.name,
            }}
          >
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Hình ảnh:</span>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  ref={inputFileRef}
                  accept=".jpg, .png, image/jpeg, image/png"
                  onChange={handleFileUpload}
                  style={{
                    backgroundColor: "transparent",
                    textAlign: "center",
                    width: "150px",
                    display: "none",
                  }}
                />
                <div style={{ textAlign: "center", width: "100%" }}>
                  <Button
                    onClick={handlingClickUpload}
                    type="primary"
                    icon={<CloudUploadOutlined />}
                  >
                    Upload Image
                  </Button>
                </div>

                {/* <Upload
                  listType="picture-card"
                  onChange={handleChange}
                  maxCount={1}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload> */}
                {avatarSrc ? (
                  <Image src={avatarSrc} alt="" width={100} height={100} />
                ) : (
                  <>
                    {props.option.image ? (
                      <>
                        <Image
                          src={props.option.image}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          src={images.nonImg}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>ID: </span>

              <Input
                placeholder="ID"
                style={{
                  width: "100%",
                }}
                disabled
                defaultValue={props.option.id}
              />
            </div>

            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Tên phân loại:{" "}
              </span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên phân loại",
                  },
                ]}
              >
                <Input
                  placeholder="Tên phân loại"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
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
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
