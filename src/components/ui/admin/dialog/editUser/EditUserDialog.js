import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState, useRef, useEffect } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dynamic from "next/dynamic";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import images from "@/assets/images";
import { EditAccountById } from "@/api/admin/EditAccountById";
import { uploadImage } from "@/components/utils/Upload";
import useFetchAccountById from "@/api/admin/useFetchAccountById";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
const Select = dynamic(() => import("react-select"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function validateData(data) {
  // Danh sách các keys bạn muốn kiểm tra, không bao gồm 'createAt' và 'avatar'
  const keysToCheck = [
    "account_id",
    "address",
    "dob",
    "email",
    "fullname",
    "gender",
    "id_permission",
    "password",
    "phone",
    "status",
    "username",
  ];

  // Kiểm tra từng key trong danh sách, nếu một trong số chúng bằng null, trả về false
  for (const key of keysToCheck) {
    if (data[key] === null) {
      return false;
    }
  }

  // Nếu không có giá trị nào bằng null, trả về true
  return true;
}

function findOptionByValue(arr, value) {
  const foundOption = arr.find((option) => option.value === value);
  return foundOption ? foundOption : null;
}

function isOnlyNumber(str) {
  return /^\d+$/.test(str);
}

export default function EditUserDialog(props) {
  const { id, data, updateData, token } = props;
  const account = useFetchAccountById(id);
  const messageRef = useRef();
  // console.log(data);

  const [open, setOpen] = React.useState(false);
  const [genderValue, setGenderValue] = useState(2);
  const [avatarSrc, setAvatarSrc] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeUsername = (e) => {
    let temp = { ...data, username: e.target.value };
    updateData(temp);
  };

  const handleChangeEmail = (e) => {
    let temp = { ...data, email: e.target.value };
    updateData(temp);
  };
  const handleChangePassword = (e) => {
    let temp = { ...data, password: e.target.value };
    updateData(temp);
  };
  const handleChangeFullname = (e) => {
    let temp = { ...data, fullname: e.target.value };
    updateData(temp);
  };
  const handleChangePhone = (e) => {
    if (isOnlyNumber(e.target.value)) {
      let temp = { ...data, phone: e.target.value };
      updateData(temp);
    }
  };
  const handleChangeAddress = (e) => {
    let temp = { ...data, address: e.target.value };
    updateData(temp);
  };
  const handleChangeGender = (e) => {
    let temp = { ...data, gender: e.target.value };
    updateData(temp);
  };
  const handleChangeDob = (value) => {
    let temp = { ...data, dob: dayjs(value).format("YYYY/MM/DD") };
    updateData(temp);
  };
  const handleChangeRole = (value) => {
    let temp = { ...data, id_permission: value.value };
    updateData(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData(data)) {
      messageRef.current.style.display = "none";
      let tempDob = data.dob;
      let temp = { ...data, dob: dayjs(tempDob).format("YYYY/MM/DD") };
      let {
        fullname,
        email,
        phone,
        dob,
        gender,
        username,
        password,
        address,
        avatar,
      } = temp;
      let temp2 = {
        fullname,
        email,
        phone,
        dob,
        gender,
        username,
        address,
        avatar,
        password,
      };
      console.log(temp2);
      const message = EditAccountById(temp.account_id, temp2, token);
      console.log(message);
      // window.location.reload();
    } else {
      messageRef.current.style.display = "block";
    }
  };

  // useEffect(() => {
  //   console.log("---");
  //   console.log(data);
  // }, [data]);

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
        let temp = { ...data, avatar: imagePath };
        updateData(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const { TextArea } = Input;
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

  if (account.isLoading) {
    return <></>;
  }
  if (account.isError) {
    return <>Error</>;
  } else
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
              CHỈNH SỬA TÀI KHOẢN
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
              onSubmit={handleSubmit}
              className={Styles["add-user-form-container"]}
            >
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Id: </span>
                <Input
                  placeholder="Id"
                  defaultValue={account.data.account_id}
                  disabled
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Email:</span>
                <Input
                  onChange={handleChangeEmail}
                  defaultValue={account.data.email}
                  placeholder="Email"
                />
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
                        priority
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      {data.avatar ? (
                        <>
                          <Image
                            src={data.avatar}
                            width={150}
                            height={150}
                            priority
                            alt=""
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            src={images.nonAvatar}
                            width={150}
                            height={150}
                            priority
                            alt=""
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Username:{" "}
                </span>
                <Input
                  onChange={handleChangeUsername}
                  placeholder="Username"
                  defaultValue={account.data.username}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Password:{" "}
                </span>
                <Input.Password
                  onChange={handleChangePassword}
                  placeholder="Password"
                  defaultValue={account.data.password}
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
                  onChange={handleChangeFullname}
                  placeholder="Họ và tên"
                  defaultValue={account.data.fullname}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Số điện thoại:
                </span>
                <Input
                  value={data.phone}
                  onChange={handleChangePhone}
                  placeholder="Số điện thoại"
                  defaultValue={account.data.phone}
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
                  defaultValue={account.data.address}
                  placeholder="Địa chỉ"
                  style={{ height: 100, resize: "none" }}
                />
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Giới tính:
                </span>
                <div className={Styles["add-user-field-gender-wrapper"]}>
                  <Radio.Group
                    defaultValue={account.data.gender}
                    onChange={handleChangeGender}
                  >
                    <Radio value={"Nam"}>Nam</Radio>
                    <Radio value={"Nữ"}>Nữ</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Ngày sinh:
                </span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs(account.data.dob)}
                    onChange={handleChangeDob}
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Role: </span>
                <div style={{ width: "100%" }}>
                  <Select
                    options={options}
                    defaultValue={findOptionByValue(
                      options,
                      account.data.id_permission
                    )}
                    onChange={handleChangeRole}
                  />
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
                <button
                  className={Styles["add-user-field-submit-btn"]}
                  type="submit"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}
