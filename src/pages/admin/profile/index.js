import React, { useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "./styles.module.css";
import { useRef, useState } from "react";

import Image from "next/image";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Radio, DatePicker, Checkbox, Input } from "antd";

import { Switch } from "antd";
import images from "@/assets/images";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import useFetchAdminProfile from "@/api/admin/useFetchAdminProfile";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import { EditProfile } from "@/api/admin/EditProfile";

const { TextArea } = Input;

function formatDate(isoDateString) {
  return dayjs(isoDateString).format("YYYY-MM-DD");
}
const dateFormat = "DD/MM/YYYY";

function containsLetter(str) {
  return /[a-zA-Z]/.test(str);
}

function checkEmptyFields(userProfile) {
  const { email, phone, address, dob, fullname } = userProfile;
  return !email || !phone || !address || !dob || !fullname;
}

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const user = useFetchAdminProfile();
  const [userProfile, setUserProfile] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  //Refs
  const passwdRef = useRef();
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const itemRef = useRef();
  const usernameRef = useRef();
  const messageRef = useRef();

  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // const handlingOpenDialog = () => {
  //   setIsOpenDialog(true);
  // };

  // const handlingCloseDialog = () => {
  //   setIsOpenDialog(false);
  // };

  const handlingChangeFullName = (e) => {
    let temp = { ...userProfile, fullname: e.target.value };
    setUserProfile(temp);
  };
  const handlingChangeEmail = (e) => {
    let temp = { ...userProfile, email: e.target.value };
    setUserProfile(temp);
  };
  const handlingChangePhone = (e) => {
    if (!containsLetter(e.target.value)) {
      let temp = { ...userProfile, phone: e.target.value };
      setUserProfile(temp);
    }
  };
  const handlingChangeGender = (e) => {
    let temp = { ...userProfile, gender: e.target.value };
    setUserProfile(temp);
  };
  const handlingChangeDob = (data, dateString) => {
    let date = dayjs(dateString, "DD/MM/YYYY");
    let newDate = date.format("YYYY/MM/DD");
    let temp = { ...userProfile, dob: newDate };
    setUserProfile(temp);
  };
  const hadnlingChangeOldPass = (e) => {
    setOldPass(e.target.value);
  };
  const hadnlingChangeAddress = (e) => {
    let temp = { ...userProfile, address: e.target.value };
    setUserProfile(temp);
  };
  const handlingChangeNewPass = (e) => {
    setNewPass(e.target.value);
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
        let temp = { ...userProfile, avatar: imagePath };
        setUserProfile(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handlingDisplayPasswd = (e) => {
    if (e.target.checked) {
      passwdRef.current.style.display = "block";
    } else {
      passwdRef.current.style.display = "none";
    }
  };

  const handlingSwitch = (e) => {
    console.log("editmode: " + e);
    setAvatarSrc(user.data.avatar);
    let temp = { ...user.data, dob: dayjs(user.data.dob).format("YYYY/MM/DD") };
    setUserProfile(temp);
    setNewPass("");
    setOldPass("");
    setIsEditMode(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (oldPass == newPass && oldPass == "" && newPass == "") {
      if (checkEmptyFields(userProfile)) {
        messageRef.current.style.display = "block";
        messageRef.current.textContent = "Vui lòng nhập đầy đủ thông tin";
      } else {
        // update profile
        console.log("--------------------------------");
        // console.log(userProfile);
        messageRef.current.style.display = "none";
        const {
          fullname,
          email,
          phone,
          address,
          dob,
          gender,
          username,
          avatar,
        } = userProfile;
        const temp = {
          fullname,
          email,
          phone,
          address,
          dob,
          gender,
          username,
          avatar,
        };

        let tempDOB = dayjs(temp.dob).format("YYYY/MM/DD");
        let result = { ...temp, dob: tempDOB };
        console.log(result);
        const message = EditProfile(result, cookies["token"]);
        console.log(message);
        window.location.reload();
      }
    } else if (oldPass != "" && newPass != "") {
      if (oldPass != newPass) {
        if (oldPass != userProfile.password) {
          messageRef.current.style.display = "block";
          messageRef.current.textContent = "Mật khẩu cũ không đúng";
        } else if (oldPass == userProfile.password) {
          // change password
          console.log("--------------------------------");
          let temp = { ...userProfile, password: newPass };
          const {
            fullname,
            email,
            phone,
            address,
            dob,
            gender,
            username,
            avatar,
            password,
          } = temp;
          const reqUser = {
            fullname,
            email,
            phone,
            address,
            dob,
            gender,
            username,
            avatar,
            password,
          };
          let tempDOB = dayjs(reqUser.dob).format("YYYY/MM/DD");
          let result = { ...reqUser, dob: tempDOB };
          console.log(result);
          messageRef.current.style.display = "none";
          const message = EditProfile(result, cookies["token"]);
          console.log(message);
          window.location.reload();
        }
      } else {
        messageRef.current.style.display = "block";
        messageRef.current.textContent = "Mật khẩu mới trùng với mật khẩu cũ";
      }
    }
  };

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  if (user.isLoading) {
    return <>Loading...</>;
  }
  if (user.isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Head>
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path={"/profile"}>
        <Toaster />
        <div className={Styles["profile-edit-card-container"]}>
          <div className={Styles["profile-edit-card-wrapper"]}>
            {/* <div className={Styles["profile-edit-form-wrapper"]}>
              <div className={Styles["profile-left-edit-form-wrapper"]}>
                <div className={Styles["profile-avatar-container"]}>
                  <div className={Styles["profile-avatar-wrapper"]}>
                    <Image
                      src={images.monster}
                      className={Styles["avatar"]}
                      alt=""
                    />
                  </div>
                  <div className={Styles["name-phone-container"]}>
                    <span>Nguyen Van A</span>
                    <span>0816789439</span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className={Styles["profile-right-edit-form-wrapper"]}>
              <div className={Styles["profile-title-wrapper"]}>
                <div className={Styles["profile-title-container"]}>
                  <span style={{ fontWeight: "400", fontSize: "20px" }}>
                    Techwave - Admin
                  </span>
                  <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                </div>
                <div className={Styles["switch-edit-container"]}>
                  <Switch onChange={handlingSwitch} />
                  {isEditMode ? (
                    <span>Hiển thị thông tin</span>
                  ) : (
                    <span>Điều chỉnh thông tin</span>
                  )}
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className={Styles["profile-form-avatar-change-container"]}
              >
                <div className={Styles["profile-form-input-container"]}>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>
                      Tên đăng nhập
                    </span>
                    <span className={Styles["profile-row2"]}>
                      {user.data.username}
                    </span>
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Họ và tên</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <Input
                          placeholder="Họ và tên"
                          defaultValue={userProfile.fullname}
                          onChange={handlingChangeFullName}
                        />
                      </span>
                    ) : (
                      <span>{user.data.fullname}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Email</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <Input
                          placeholder="Họ và tên"
                          defaultValue={userProfile.email}
                          onChange={handlingChangeEmail}
                        />
                      </span>
                    ) : (
                      <span>{user.data.email}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>
                      Số điện thoại
                    </span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <Input
                          placeholder="Họ và tên"
                          value={userProfile.phone}
                          onChange={handlingChangePhone}
                        />
                      </span>
                    ) : (
                      <span>{user.data.phone}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Địa chỉ</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <TextArea
                          placeholder="Địa chỉ"
                          autoSize={{
                            minRows: 2,
                            maxRows: 6,
                          }}
                          onChange={hadnlingChangeAddress}
                          defaultValue={userProfile.address}
                        />
                      </span>
                    ) : (
                      <span>{user.data.address}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Giới tính</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <span>
                          <Radio.Group
                            ref={usernameRef}
                            name="radiogroup"
                            defaultValue={userProfile.gender}
                            onChange={handlingChangeGender}
                          >
                            <Radio value={"Nam"}>Nam</Radio>
                            <Radio value={"Nữ"}>Nữ</Radio>
                            <Radio value={"Khác"}>Khác</Radio>
                          </Radio.Group>
                        </span>
                      </span>
                    ) : (
                      <span className={Styles["profile-row2"]}>
                        {user.data.gender}
                      </span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Ngày sinh:</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <DatePicker
                          style={{ width: "100%" }}
                          defaultValue={dayjs(formatDate(userProfile.dob))}
                          format={dateFormat}
                          onChange={handlingChangeDob}
                        />
                      </span>
                    ) : (
                      <span>{dayjs(user.data.dob).format("DD/MM/YYYY")}</span>
                    )}
                  </div>
                  {isEditMode && (
                    <div className={Styles["profile-col"]}>
                      <span className={Styles["profile-row1"]}>
                        Thay đổi mật khẩu
                      </span>
                      <span className={Styles["profile-row2"]}>
                        <Checkbox
                          onChange={handlingDisplayPasswd}
                          defaultChecked={false}
                        />
                      </span>
                    </div>
                  )}

                  <div className={Styles["passwd-container"]} ref={passwdRef}>
                    <div
                      className={Styles["profile-col"]}
                      style={{ marginBottom: "20px" }}
                    >
                      <span className={Styles["profile-row1"]}>
                        Nhập mật khẩu cũ
                      </span>
                      <span className={Styles["profile-row2"]}>
                        <Input.Password
                          placeholder="Nhập mật khẩu cũ"
                          onChange={hadnlingChangeOldPass}
                          iconRender={(visible) =>
                            visible ? <VisibilityIcon /> : <VisibilityOffIcon />
                          }
                        />
                      </span>
                    </div>
                    <div className={Styles["profile-col"]}>
                      <span className={Styles["profile-row1"]}>
                        Nhập mật khẩu mới
                      </span>
                      <span className={Styles["profile-row2"]}>
                        <Input.Password
                          onChange={handlingChangeNewPass}
                          placeholder="Nhập mật khẩu mới"
                          iconRender={(visible) =>
                            visible ? <VisibilityIcon /> : <VisibilityOffIcon />
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className={Styles["submit-btn-wrapper"]}>
                    {isEditMode && (
                      <span
                        style={{ color: "red", display: "none" }}
                        ref={messageRef}
                      >
                        Vui lòng nhập đầy đủ thông tin
                      </span>
                    )}
                  </div>
                  <div className={Styles["submit-btn-wrapper"]}>
                    {isEditMode && (
                      <button className={Styles["submit-btn"]}>
                        <div
                          href={""}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {" "}
                          Lưu thay đổi
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                <div className={Styles["profile-form-avatar-container"]}>
                  {isEditMode ? (
                    <div className={Styles["profile-avt-input-container"]}>
                      {avatarSrc ? (
                        <div
                          className={Styles["profile-avt-preview-wrapper"]}
                          // onClick={handlingOpenDialog}
                        >
                          <Image
                            width={150}
                            height={150}
                            src={avatarSrc}
                            alt=""
                            className={Styles["avt-preview"]}
                          />
                        </div>
                      ) : (
                        <div
                          className={Styles["profile-avt-preview-wrapper"]}
                          // onClick={handlingOpenDialog}
                        >
                          <Image
                            width={150}
                            height={150}
                            src={images.nonAvatar}
                            alt=""
                            className={Styles["avt-preview"]}
                          />
                        </div>
                      )}

                      {/* <input
                        className={Styles["submit-avt-btn"]}
                        // onClick={handlingOpenDialog}
                      >
                        Chọn ảnh
                      </input> */}
                      <div className={Styles["submit-avt-input-wrapper"]}>
                        <input
                          onChange={handleFileUpload}
                          type="file"
                          className={Styles["submit-avt-input"]}
                        />
                      </div>

                      {/* <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Select File
                        </Button>
                      </Upload> */}
                      <div className={Styles["desc-wrapper"]}>
                        <span className={Styles["desc"]}>
                          Dung lượng tối đa: 1MB
                        </span>
                        <span className={Styles["desc"]}>
                          Định dạng:.JPEG, .PNG
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={Styles["avtar-display-wrapper"]}>
                      {user.data && user.data.avatar ? (
                        <Image
                          width={150}
                          height={150}
                          src={user.data.avatar}
                          alt=""
                          priority={true}
                          className={Styles["avtar-display"]}
                        />
                      ) : (
                        <Image
                          width={150}
                          height={150}
                          src={images.nonAvatar}
                          alt=""
                          priority={true}
                          className={Styles["avtar-display"]}
                        />
                      )}
                    </div>
                  )}
                </div>
                {/* <EditImageDialog
                  isOpen={isOpenDialog}
                  onClose={handlingCloseDialog}
                  onChange={setAvatarSrc}
                /> */}
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Home;
