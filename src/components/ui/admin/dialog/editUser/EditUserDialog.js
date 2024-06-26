import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState, useRef, useEffect } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio, Form, Button, DatePicker, Select, Empty } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import images from "@/assets/images";
import { EditAccountById } from "@/api/admin/EditAccountById";
import { uploadImage } from "@/components/utils/Upload";
import useFetchAccountById from "@/api/admin/useFetchAccountById";
import {
  CloudUploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { regexPhoneNumber, mailformat } from "@/assets/utils/regex";
import { GHN_API } from "@/api/GHN/GHN";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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

const LocationProvider = new GHN_API();

export default function EditUserDialog(props) {
  const { id, data, updateData, token, mutating } = props;

  const messageRef = useRef();

  const [avatarSrc, setAvatarSrc] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [isDisabledDistricts, setIsDisabledDistricts] = useState(false);
  const [isDisabledWards, setIsDisabledWards] = useState(false);
  const [isDisabledAdress, setIsDisabledAddress] = useState(false);

  //API Hooks
  const provinces = LocationProvider.getProvinces();
  const districts = LocationProvider.getDistricts(provinceId);
  const wards = LocationProvider.getWards(districtId);

  //Refs
  const inputFileRef = useRef();

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  const handleChangeSelectProvince = (value) => {
    setProvinceId(value.key);
    setDistrictId(null);
    setWardId(null);
  };

  const handleChangeSelectDistrict = (value) => {
    setDistrictId(value.key);
    setWardId("");
  };

  const handleChangeSelectWard = (value) => {
    setWardId(value.key);
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

  const onFinish = async (values) => {
    let final = {};
    if (avatarSrc) {
      final = { ...values, avatar: avatarSrc };
    } else {
      final = { ...values, avatar: data.avatar };
    }
    final.dob = dayjs(final.dob).format("YYYY/MM/DD");
    if (final.id_permission?.value) {
      final.id_permission = final.id_permission.value;
    }

    let user = {
      ...final,
      username: data.username,
      province: final.province.value,
      province_id: final.province.key,
      district: final.district.value,
      district_id: final.district.key,
      ward: final.ward.value,
      ward_id: final.ward.key,
    };
    const message = await EditAccountById(data.account_id, user, token);
    await mutating();
    handlingCloseDialog();
  };

  const handlingCloseDialog = () => {
    props.handleClose();
    setAvatarSrc(null);
    setProvinceId(null);
    setDistrictId(null);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Mời nhập lại thông tin");
  };

  useEffect(() => {
    if (provinceId) {
      setIsDisabledDistricts(false);
    } else {
      setIsDisabledDistricts(true);
    }
    if (districtId) {
      setIsDisabledWards(false);
    } else {
      setIsDisabledWards(true);
    }
  }, [provinceId, districtId]);

  // if (account.isLoading) {
  //   return <></>;
  // }
  // if (account.isError) {
  //   return <>Error</>;
  // } else
  if (data)
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          onClose={handlingCloseDialog}
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
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={Styles["add-user-form-container"]}
              initialValues={{
                address: data.address?.address,
                dob: dayjs(data.dob, "YYYY/MM/DD"),
                email: data.email,
                fullname: data.fullname,
                gender: data.gender,
                id_permission: data.id_permission,
                password: data.password,
                phone: data.phone,
                username: data.username,
                province: {
                  key: data.address?.province_id,
                  value: data.address?.province,
                },
                district: {
                  value: data.address?.district,
                  key: data.address?.district_id,
                },
                ward: {
                  value: data.address?.ward,
                  key: data.address?.ward_id,
                },
              }}
            >
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Avatar:</span>
                <div className={Styles["input-file-img-container"]}>
                  <input
                    ref={inputFileRef}
                    onChange={handleFileUpload}
                    type="file"
                    accept=".jpg, .png, image/jpeg, image/png"
                    style={{ backgroundColor: "white", display: "none" }}
                  />
                  <Button
                    onClick={handlingClickUpload}
                    type="primary"
                    icon={<CloudUploadOutlined />}
                  >
                    Upload Image
                  </Button>

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
                      {data.avatar ? (
                        <>
                          <Image
                            src={data.avatar}
                            width={150}
                            height={150}
                            alt=""
                            priority
                            style={{ borderRadius: "50%" }}
                          />
                        </>
                      ) : (
                        <Image
                          src={images.nonAvatar}
                          width={150}
                          height={150}
                          alt=""
                          priority
                          style={{ borderRadius: "50%" }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>ID:</span>
                <Input placeholder="ID" value={data.account_id} disabled />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Email:</span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập Email tài khoản",
                    },
                    {
                      pattern: mailformat,
                      message: "Email không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Username:{" "}
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập username tài khoản",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Password:{" "}
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập username tài khoản",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Họ và tên:
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập Họ và Tên tài khoản",
                    },
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Số điện thoại:
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số điện thoại tài khoản",
                    },
                    {
                      pattern: regexPhoneNumber,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Tỉnh thành:
                </span>

                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tỉnh thành",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Tỉnh thành"}
                    dropdownStyle={{ zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectProvince}
                  >
                    {provinces.isLoading && (
                      <>
                        <Option>HELLO</Option>
                      </>
                    )}
                    {provinces.data ? (
                      provinces.data.data.map((province) => {
                        return (
                          <Option
                            key={province.ProvinceID}
                            value={province.ProvinceName}
                          >
                            {province.ProvinceName}
                          </Option>
                        );
                      })
                    ) : (
                      <>
                        <Empty />
                      </>
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Quận, huyện:
                </span>

                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập quận, huyện",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Quận huyện"}
                    dropdownStyle={{ zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectDistrict}
                    disabled={isDisabledDistricts}
                  >
                    {districts.data ? (
                      districts.data.data.map((district) => {
                        return (
                          <Option
                            value={district.DistrictName}
                            key={district.DistrictID}
                          >
                            {district.DistrictName}
                          </Option>
                        );
                      })
                    ) : (
                      <Empty />
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Xã, Phường:
                </span>

                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập xã, phường",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Xã, Phường"}
                    dropdownStyle={{ zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectWard}
                    disabled={isDisabledWards}
                  >
                    {wards.data ? (
                      wards.data.data.map((ward) => {
                        return (
                          <Option value={ward.WardName} key={ward.WardCode}>
                            {ward.WardName}
                          </Option>
                        );
                      })
                    ) : (
                      <>
                        <Empty />
                      </>
                    )}
                    {/* <Option value={1}>ABC</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <div
                className={Styles["add-user-field-container"]}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <span className={Styles["add-user-field-label"]}>Địa chỉ:</span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập địa chỉ tài khoản",
                    },
                  ]}
                >
                  <TextArea showCount maxLength={100} placeholder="Địa chỉ" />
                </Form.Item>
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Giới tính:
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập giới tính tài khoản",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={"Nam"}>Nam</Radio>
                    <Radio value={"Nữ"}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Ngày sinh:
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập ngày sinh tài khoản",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh"
                    format={"DD/MM/YYYY"}
                    dropdownClassName={Styles["date-dropdown"]}
                  />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Role: </span>
                <div
                  className={Styles["input-wrapper"]}
                  style={{ width: "100%" }}
                >
                  <Select
                    disabled
                    placeholder={"Loại tài khoản"}
                    style={{ width: "100%" }}
                    dropdownStyle={{ width: "600px", zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    value={data.id_permission}
                    className={`phone-input-selector ${Styles["phone-input-selector"]}`}
                  >
                    <Option value={1}>
                      <div className={Styles["select-container"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="200"
                          height="200"
                          viewBox="0 0 26 26"
                          className={Styles["svg-container"]}
                        >
                          <path
                            fill="currentColor"
                            d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.396c-3.324 1.203-7.224 3.394-7.224 5.557v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557zm-5.516 8.709c0-2.549 1.623-5.99 1.623-5.99l-1.123-.881c0-.842 1.453-1.723 1.453-1.723s1.449.895 1.449 1.723l-1.119.881s1.623 3.428 1.623 6.018c0 .406-3.906.312-3.906-.028z"
                          />
                        </svg>
                        <span>Admin</span>
                      </div>
                    </Option>
                    <Option value={3}>
                      <div className={Styles["select-container"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="200"
                          height="200"
                          viewBox="0 0 14 14"
                          className={Styles["svg-container"]}
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M8 3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m2.75 4.5a.75.75 0 0 1 .75.75V10h1.75a.75.75 0 0 1 0 1.5H11.5v1.75a.75.75 0 0 1-1.5 0V11.5H8.25a.75.75 0 0 1 0-1.5H10V8.25a.75.75 0 0 1 .75-.75M5 7c1.493 0 2.834.655 3.75 1.693v.057h-.5a2 2 0 0 0-.97 3.75H.5A.5.5 0 0 1 0 12a5 5 0 0 1 5-5"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>Người dùng</span>
                      </div>
                    </Option>
                    <Option value={2}>
                      <div className={Styles["select-container"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="200"
                          height="200"
                          viewBox="0 0 14 14"
                          className={Styles["svg-container"]}
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M2 0a.5.5 0 0 0-.453.288l-1.5 3.209a.5.5 0 0 0-.045.253H0v.945c0 .524.226 1.026.63 1.396c.402.37.949.578 1.519.578h.3a2.25 2.25 0 0 0 1.52-.578c.164-.15.298-.322.4-.508c.127-.17.333-.17.452-.014c.103.192.24.368.407.522c.403.37.95.578 1.52.578h.537a2.25 2.25 0 0 0 1.52-.578c.156-.144.286-.307.386-.484c.131-.205.36-.2.48-.01c.101.181.233.348.392.494c.403.37.95.578 1.52.578h.268a2.25 2.25 0 0 0 1.52-.578c.403-.37.629-.872.629-1.396V3.75h-.002a.5.5 0 0 0-.045-.253l-1.5-3.209A.5.5 0 0 0 12 0zM1 13V7.729c1.188.392 2.605.217 3.578-.536c1.298 1.004 3.549 1.004 4.846 0c.978.756 2.392.928 3.576.526V13a1 1 0 0 1-1 1h-1.255v-3.79a.21.21 0 0 0-.07-.155a.25.25 0 0 0-.17-.064H8.513a.25.25 0 0 0-.17.064a.21.21 0 0 0-.07.155V14H2a1 1 0 0 1-1-1m1.502-2.24V9.5a.5.5 0 0 1 .5-.5h3.014a.5.5 0 0 1 .5.5v1.26a.5.5 0 0 1-.5.5H3.002a.5.5 0 0 1-.5-.5"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>Vendor</span>
                      </div>
                    </Option>
                  </Select>
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
                  Cập nhật
                </button>
              </div>
            </Form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}
