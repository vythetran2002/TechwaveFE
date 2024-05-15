import React, { useEffect } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "./styles.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
import { Radio, DatePicker, Checkbox, Input } from "antd";
import { Switch, Form, Button, Select, Empty } from "antd";
import images from "@/assets/images";
import dayjs from "dayjs";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import {
  CloudUploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { PutVendorProfile } from "@/api/vendor/PutVendorProfile";
import { regexPhoneNumber, mailformat } from "@/assets/utils/regex";
import Cookies from "js-cookie";
import { GHN_API } from "@/api/GHN/GHN";

const { TextArea } = Input;

const dateFormat = "DD/MM/YYYY";

const LocationProvider = new GHN_API();

function Home() {
  const token = Cookies.get("token");
  const user = useFetchVendorProfile();
  const [userProfile, setUserProfile] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passwdEditMode, setPasswdEditMode] = useState(false);
  const [form] = Form.useForm();
  const [provinceId, setProvinceId] = useState(false);
  const [districtId, setDistrictId] = useState(false);
  const [wardId, setWardId] = useState(null);
  const [isDisabledDistricts, setIsDisabledDistricts] = useState(true);
  const [isDisabledWards, setIsDisabledWards] = useState(true);

  //API Hooks
  const provinces = LocationProvider.getProvinces();
  const districts = LocationProvider.getDistricts(provinceId);
  const wards = LocationProvider.getWards(districtId);

  //Refs
  const passwdRef = useRef(null);
  const usernameRef = useRef();
  const messageRef = useRef();
  const inputFileRef = useRef();
  const passwdChangeLabel = useRef();
  const switchRef = useRef();

  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // const handlingOpenDialog = () => {
  //   setIsOpenDialog(true);
  // };

  // const handlingCloseDialog = () => {
  //   setIsOpenDialog(false);
  // };

  const handleChangeSelectProvince = (value) => {
    setProvinceId(value.key);
    setDistrictId("");
    setWardId("");
  };

  const handleChangeSelectDistrict = (value) => {
    setDistrictId(value.key);
    setWardId("");
  };

  const handleChangeSelectWard = (value) => {
    setWardId(value.key);
  };

  const hadnlingChangeOldPass = (e) => {
    setOldPass(e.target.value);
  };
  const handlingChangeNewPass = (e) => {
    setNewPass(e.target.value);
  };
  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        //console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        let temp = { ...userProfile, avatar: imagePath };
        setUserProfile(temp);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
    // promiseResult
    //   .then((result) => {
    //     const imagePath = result.imagePath;
    //     console.log("imagePath:", imagePath);
    //     setAvatarSrc(imagePath);
    //     let temp = { ...userProfile, avatar: imagePath };
    //     setUserProfile(temp);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi:", error);
    //   });
  }
  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  const handlingDisplayPasswd = (e) => {
    if (e.target.checked) {
      setPasswdEditMode(true);
    } else {
      setPasswdEditMode(false);
    }
  };

  const handlingSwitch = async (e) => {
    await setAvatarSrc(user.data.avatar);
    let temp = { ...user.data, dob: dayjs(user.data.dob).format("YYYY/MM/DD") };
    setUserProfile(temp);
    setNewPass("");
    setOldPass("");
    setIsEditMode(e);
    await form.resetFields();
    await setPasswdEditMode(false);
    passwdChangeLabel.current.style.opacity = 0;
    setProvinceId(null);
    setDistrictId(null);
  };

  const onFinish = async (values) => {
    let final = {};
    if (avatarSrc) {
      final = { ...values, avatar: avatarSrc };
    } else {
      final = { ...values, avatar: user.data.avatar };
    }
    // Change Password
    if (values?.oldPassword) {
      if (values.oldPassword != user.data.password) {
        passwdChangeLabel.current.style.opacity = 1;
        return 0;
      } else {
        passwdChangeLabel.current.style.opacity = 0;
      }
    }

    let data = {
      ...final,
      username: user.data.username,
      province: final.province.value,
      province_id: final.province.key,
      district: final.district.value,
      district_id: final.district.key,
      ward: final.ward.value,
      ward_id: final.ward.key,
    };

    await delete data.oldPassword;
    data.dob = dayjs(final.dob).format("YYYY/MM/DD");
    const message = await PutVendorProfile(data, token);
    await switchRef.current.click();
    await user.mutate(); // mutate data
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

  if (user.isLoading) {
    return <>Loading...</>;
  }
  if (user.isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path={"/profile"}>
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
                    TW. Shop
                  </span>
                  <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                </div>
                <div className={Styles["switch-edit-container"]}>
                  <Switch onChange={handlingSwitch} ref={switchRef} />
                  {isEditMode ? (
                    <span>Hiển thị thông tin</span>
                  ) : (
                    <span>Điều chỉnh thông tin</span>
                  )}
                </div>
              </div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                className={Styles["profile-form-avatar-change-container"]}
                initialValues={{
                  fullname: user.data.fullname,
                  email: user.data.email,
                  phone: user.data.phone,
                  address: user.data.address.address,
                  gender: user.data.gender,
                  dob: dayjs(user.data.dob, "YYYY/MM/DD"),
                  province: {
                    key: user.data.address.province_id,
                    value: user.data.address.province,
                  },
                  district: {
                    value: user.data.address.district,
                    key: user.data.address.district_id,
                  },
                  ward: {
                    value: user.data.address.ward,
                    key: user.data.address.ward_id,
                  },
                }}
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
                        <Form.Item
                          className={Styles["input-wrapper"]}
                          name="fullname"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập họ và tên",
                            },
                          ]}
                        >
                          <Input placeholder="Họ và tên" />
                        </Form.Item>
                      </span>
                    ) : (
                      <span>{user.data.fullname}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Email</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <Form.Item
                          className={Styles["input-wrapper"]}
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập email",
                            },
                            {
                              pattern: mailformat,
                              message: "Email không hợp lệ",
                            },
                          ]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
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
                        <Form.Item
                          className={Styles["input-wrapper"]}
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập số điện thoại",
                            },
                            {
                              pattern: regexPhoneNumber,
                              message: "Số điện thoại không hợp lệ",
                            },
                          ]}
                        >
                          <Input placeholder="Số điện thoại" />
                        </Form.Item>
                      </span>
                    ) : (
                      <span>{user.data.phone}</span>
                    )}
                  </div>
                  {isEditMode ? (
                    <div className={Styles["profile-col"]}>
                      <span className={Styles["profile-row1"]}>Tỉnh</span>
                      <span className={Styles["profile-row2"]}>
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
                            dropdownStyle={{
                              width: "430px",
                              zIndex: "99999999",
                            }}
                            placement="bottomRight"
                            labelInValue={true}
                            showSearch
                            size="middle"
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
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}

                  {isEditMode ? (
                    <div className={Styles["profile-col"]}>
                      <span className={Styles["profile-row1"]}>
                        Quận, huyện
                      </span>
                      <span className={Styles["profile-row2"]}>
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
                            dropdownStyle={{
                              width: "430px",
                              zIndex: "99999999",
                            }}
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
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}

                  {isEditMode ? (
                    <div className={Styles["profile-col"]}>
                      <span className={Styles["profile-row1"]}>Xã, Phường</span>
                      <span className={Styles["profile-row2"]}>
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
                            dropdownStyle={{
                              width: "430px",
                              zIndex: "99999999",
                            }}
                            placement="bottomRight"
                            labelInValue={true}
                            showSearch
                            onChange={handleChangeSelectWard}
                            disabled={isDisabledWards}
                          >
                            {wards.data ? (
                              wards.data.data.map((ward) => {
                                return (
                                  <Option
                                    value={ward.WardName}
                                    key={ward.WardCode}
                                  >
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
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Địa chỉ</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <Form.Item
                          className={Styles["input-wrapper"]}
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập địa chỉ",
                            },
                          ]}
                        >
                          <TextArea
                            placeholder="Địa chỉ"
                            autoSize={{
                              minRows: 2,
                              maxRows: 6,
                            }}
                          />
                        </Form.Item>
                      </span>
                    ) : (
                      <span>{user.data.address.address}</span>
                    )}
                  </div>
                  <div className={Styles["profile-col"]}>
                    <span className={Styles["profile-row1"]}>Giới tính</span>
                    {isEditMode ? (
                      <span className={Styles["profile-row2"]}>
                        <span>
                          <Form.Item
                            className={Styles["input-wrapper"]}
                            name="gender"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập giới tính",
                              },
                            ]}
                          >
                            <Radio.Group ref={usernameRef} name="radiogroup">
                              <Radio value={"Nam"}>Nam</Radio>
                              <Radio value={"Nữ"}>Nữ</Radio>
                              <Radio value={"Khác"}>Khác</Radio>
                            </Radio.Group>
                          </Form.Item>
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
                        <Form.Item
                          className={Styles["input-wrapper"]}
                          name="dob"
                          rules={[
                            {
                              required: true,
                              message: "Hãy nhập ngày sinh",
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            // defaultValue={dayjs(formatDate(userProfile.dob))}
                            format={dateFormat}
                            // onChange={handlingChangeDob}
                          />
                        </Form.Item>
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

                  {passwdEditMode ? (
                    <>
                      <div
                        className={Styles["passwd-container"]}
                        ref={passwdRef}
                      >
                        <div
                          className={Styles["profile-col"]}
                          style={{ marginBottom: "20px" }}
                        >
                          <span className={Styles["profile-row1"]}>
                            Nhập mật khẩu cũ
                          </span>

                          <span className={Styles["profile-row2"]}>
                            <Form.Item
                              className={Styles["input-wrapper"]}
                              name="oldPassword"
                              rules={[
                                {
                                  required: true,
                                  message: "Hãy nhập mật khẩu cũ",
                                },
                              ]}
                            >
                              <Input.Password
                                placeholder="Nhập mật khẩu cũ"
                                onChange={hadnlingChangeOldPass}
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeOutlined />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                              />
                            </Form.Item>
                          </span>
                        </div>
                        <div className={Styles["profile-col"]}>
                          <span className={Styles["profile-row1"]}>
                            Nhập mật khẩu mới
                          </span>
                          <span className={Styles["profile-row2"]}>
                            <Form.Item
                              className={Styles["input-wrapper"]}
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: "Hãy nhập mật khẩu mới",
                                },
                              ]}
                            >
                              <Input.Password
                                onChange={handlingChangeNewPass}
                                placeholder="Nhập mật khẩu mới"
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeOutlined />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                              />
                            </Form.Item>
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

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
                  <span
                    ref={passwdChangeLabel}
                    className={Styles["password-change-label"]}
                  >
                    Mật khẩu cũ không khớp
                  </span>

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
                          onClick={handlingClickUpload}
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
                        <Button
                          onClick={handlingClickUpload}
                          type="primary"
                          icon={<CloudUploadOutlined />}
                        >
                          Upload Image
                        </Button>
                        <input
                          ref={inputFileRef}
                          onChange={handleFileUpload}
                          type="file"
                          className={Styles["submit-avt-input"]}
                          style={{ display: "none" }}
                          accept=".jpg, .png, image/jpeg, image/png"
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
              </Form>
            </div>
          </div>
        </div>
      </VendorLayout>
    </>
  );
}

export default Home;
