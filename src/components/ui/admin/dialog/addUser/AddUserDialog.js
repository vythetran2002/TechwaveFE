import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect, useRef } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Input, Radio } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import images from "@/assets/images";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "react-select";
import { Toaster } from "react-hot-toast";
import { uploadImage } from "@/components/utils/Upload";
import { CreateAccount } from "@/api/admin/CreateAccount";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function isOnlyNumber(str) {
  return /^\d+$/.test(str);
}

function checkArrayProperties(arr) {
  // Kiểm tra mảng có đủ thuộc tính không
  var requiredProperties = [
    "fullname",
    "email",
    "phone",
    "dob",
    "gender",
    "username",
    "password",
    "address",
    "id_permission",
    "avatar",
  ];
  var hasAllProperties = requiredProperties.every(function (property) {
    return arr.hasOwnProperty(property);
  });

  if (!hasAllProperties) {
    // Mảng không đủ thuộc tính
    return false;
  }

  // Kiểm tra giá trị của thuộc tính
  var hasNullValue = Object.values(arr).some(function (value) {
    return value === null;
  });

  if (hasNullValue) {
    // Có giá trị null
    return false;
  }

  // Không có giá trị null
  return true;
}

const { TextArea } = Input;

export default function AddUserDialog(props) {
  const { token } = props;

  const [avatarSrc, setAvatarSrc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [account, setAccount] = useState({
    fullname: null,
    email: null,
    phone: null,
    dob: null,
    gender: null,
    username: null,
    password: null,
    address: null,
    id_permission: null,
    avatar: null,
  });
  const [phoneNumber, setPhoneNumber] = useState();

  //Refs
  const messageRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeUsername = (e) => {
    let temp = { ...account, username: e.target.value };
    setAccount(temp);
  };

  const handleChangeEmail = (e) => {
    let temp = { ...account, email: e.target.value };
    setAccount(temp);
  };
  const handleChangePassword = (e) => {
    let temp = { ...account, password: e.target.value };
    setAccount(temp);
  };
  const handleChangeFullname = (e) => {
    let temp = { ...account, fullname: e.target.value };
    setAccount(temp);
  };
  const handleChangePhone = (e) => {
    if (isOnlyNumber(e.target.value)) {
      let temp = { ...account, phone: e.target.value };
      setAccount(temp);
    }
  };
  const handleChangeAddress = (e) => {
    let temp = { ...account, address: e.target.value };
    setAccount(temp);
  };
  const handleChangeGender = (e) => {
    let temp = { ...account, gender: e.target.value };
    setAccount(temp);
  };
  const handleChangeDob = (value) => {
    let temp = { ...account, dob: dayjs(value).format("YYYY/MM/DD") };
    setAccount(temp);
  };
  const handleChangeRole = (value) => {
    let temp = { ...account, id_permission: value.value };
    setAccount(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkArrayProperties(account)) {
      messageRef.current.style.display = "none";
      let temp = { ...account };
      const message = CreateAccount(temp, token);
      console.log(message);
    } else {
      messageRef.current.style.display = "block";
    }
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    promiseResult
      .then((result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        let temp = { ...account, avatar: imagePath };
        setAccount(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

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

  const options = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Vendor" },
    { value: 3, label: "Customer" },
  ];

  // useEffect(() => {
  //   console.log(account);
  // }, [account]);

  return (
    <React.Fragment>
      <Toaster />
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
            Thêm khách hàng
          </span>
          <div
            className={Styles["close-icon-wrapper"]}
            onClick={props.handleClose}
          >
            <CancelOutlinedIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={handleSubmit}
              className={Styles["add-user-form-container"]}
            >
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Email:</span>
                <Input placeholder="Email" onChange={handleChangeEmail} />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Username:{" "}
                </span>
                <Input placeholder="Username" onChange={handleChangeUsername} />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Avatar:</span>
                <div className={Styles["input-file-img-container"]}>
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    style={{ backgroundColor: "white" }}
                  />
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
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Password:{" "}
                </span>
                <Input.Password
                  placeholder="Password"
                  onChange={handleChangePassword}
                  iconRender={(visible) =>
                    visible ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )
                  }
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Họ và tên:
                </span>
                <Input
                  placeholder="Họ và tên"
                  onChange={handleChangeFullname}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Số điện thoại:
                </span>
                <Input
                  value={account.phone}
                  placeholder="Số điện thoại"
                  onChange={handleChangePhone}
                />
              </div>
              <div
                className={Styles["add-user-field-container"]}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <span className={Styles["add-user-field-label"]}>Địa chỉ:</span>
                <TextArea
                  onChange={handleChangeAddress}
                  showCount
                  maxLength={100}
                  placeholder="Địa chỉ"
                  style={{ height: 100, resize: "none" }}
                />
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Giới tính:
                </span>
                <div className={Styles["add-user-field-gender-wrapper"]}>
                  <Radio.Group onChange={handleChangeGender}>
                    <Radio value={"Nam"}>Nam</Radio>
                    <Radio value={"Nữ"}>Nữ</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Ngày sinh:
                </span>
                <DatePicker
                  onChange={handleChangeDob}
                  sx={{
                    width: "100%",
                  }}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Role: </span>
                <div style={{ width: "100%" }}>
                  <Select options={options} onChange={handleChangeRole} />
                </div>
              </div>
              <div
                className={Styles["add-user-field-container"]}
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  color: "red",
                  display: "none",
                }}
                ref={messageRef}
              >
                Cần điền đầy đủ thông tin
              </div>
              <div className={Styles["add-user-field-submit-container"]}>
                <span
                  className={Styles["add-user-field-cancle-btn"]}
                  onClick={props.handleClose}
                >
                  Huỷ
                </span>
                <button className={Styles["add-user-field-submit-btn"]}>
                  THÊM
                </button>
              </div>
            </form>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
