import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import images from "@/assets/images";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Styles from "../styles.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Radio } from "antd";
import { Form, Select, Input, Empty } from "antd";
import { regexPhoneNumber, mailformat } from "@/assets/utils/regex";
import { GHN_API } from "@/api/GHN/GHN";
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

const LoginScheme = Yup.object().shape({
  userName: Yup.string()
    .required("Thông tin bắt buộc")
    .min(2, "Họ tên phải ít nhất có 2 ký tự")
    .max(50, "Họ tên không quá 50 ký tự"),
  fullName: Yup.string()
    .required("Thông tin bắt buộc")
    .min(2, "Họ tên phải ít nhất có 2 ký tự")
    .max(50, "Họ tên không quá 50 ký tự"),
  email: Yup.string()
    .email("Mời nhập đúng Email")
    .required("Vui lòng nhập thông tin"),
  phoneNumber: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không quá 15 chữ số"),
  // date: Yup.date()
  //   .required("Ngày là bắt buộc")
  //   .min(new Date(1900, 0, 1), "Ngày không hợp lệ")
  //   .max(new Date(), "Ngày không thể ở tương lai"),
  password: Yup.string()
    .max(20, "Mật khẩu quá dài")
    .required("Vui lòng nhập thông tin"),
});

const { TextArea } = Input;
const { Option } = Select;

const LocationProvider = new GHN_API();

function Index() {
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [adress, setAddress] = useState(null);
  const [isDisabledDistricts, setIsDisabledDistricts] = useState(true);
  const [isDisabledWards, setIsDisabledWards] = useState(true);
  const [isDisabledAdress, setIsDisabledAddress] = useState(true);

  //API Hooks
  const provinces = LocationProvider.getProvinces();
  const districts = LocationProvider.getDistricts(provinceId);
  const wards = LocationProvider.getWards(districtId);

  const router = useRouter();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [gender, setGender] = useState("Nam");
  const [pass, setPass] = useState();
  const [role, setRole] = useState(3);

  const messRef = useRef();

  const handleChangeSelectProvince = (value) => {
    setProvinceId(value.key);
    setDistrictId("");
    setWardId("");
    setAddress("");
  };

  const handleChangeSelectDistrict = (value) => {
    setDistrictId(value.key);
    setWardId("");
    setAddress("");
  };

  const handleChangeSelectWard = (value) => {
    setWardId(value.key);
    setAddress("");
  };

  const handleChangeAddress = (value) => {
    setAddress(value);
  };

  const onChangeGender = ({ target: { value } }) => {
    setGender(value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleResgiter = async (e) => {
    e.preventDefault();
    let info = {
      fullname: name,
      email: email,
      address: address,
      phone: phone,
      dob: date,
      gender: gender,
      username: username,
      password: pass,
    };

    if (checkAllProperties(info)) {
      if (role == "user") {
        try {
          // Gửi yêu cầu đăng nhập tới API
          const response = await axios.post(
            "http://localhost:3000/api/register",
            info
          );
          if (response.data) {
            console.log(response.data);
            toast.success("Đăng ký thành công");
            router.push("/auth/login");
          }
        } catch (error) {
          console.error("Đăng ký thất bại", error);
          toast.error("Đăng ký thất bại");
          // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
        }
      } else if (role == "vendor") {
        try {
          // Gửi yêu cầu đăng nhập tới API
          const response = await axios.post(
            "http://localhost:3000/api/registerStaff",
            info
          );
          if (response.data) {
            console.log(response.data);
            toast.success("Đăng ký thành công");
            router.push("/auth/login");
          }
        } catch (error) {
          console.error("Đăng ký thất bại", error);
          toast.error("Đăng ký thất bại");
          // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
        }
      }
    } else {
      messRef.current.style.display = "block";
      toast.error("Cần nhập đầy đủ thông");
    }
  };

  const onFinish = async (values) => {
    let final = {
      ...values,
      gender: gender,
      id_permission: role,
      avatar: null,
    };
    final.dob = dayjs(final.dob).format("YYYY/MM/DD");

    let user = {
      ...final,
      province: final.province.value,
      province_id: final.province.key,
      district: final.district.value,
      district_id: final.district.key,
      ward: final.ward.value,
      ward_id: final.ward.key,
    };

    if (final.id_permission === 3) {
      try {
        // Gửi yêu cầu đăng nhập tới API
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/api/register",
          user
        );
        if (response.data) {
          toast.success("Đăng ký thành công");
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Đăng ký thất bại", error);
        toast.error("Đăng ký thất bại");
        // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
      }
    }
    if (final.id_permission === 2) {
      try {
        // Gửi yêu cầu đăng nhập tới API
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/api/registerStaff",

          user
        );
        if (response.data) {
          console.log(response.data);
          toast.success("Đăng ký thành công");
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Đăng ký thất bại", error);
        toast.error("Đăng ký thất bại");
        // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Cần điền đủ thông tin");
    messRef.current.style.display = "block";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginScheme),
  });

  const onChange = (date, stringDate) => {
    console.log(dayjs(stringDate).format("DD-MM-YYYY"));
    setDate(stringDate);
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   let info = {
  //     fullname: name,
  //     email: email,
  //     address: address,
  //     phone: phone,
  //     dob: date,
  //     gender: gender,
  //     username: username,
  //     password: pass,
  //   };
  //   console.log(info);
  // };

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
    if (wardId) {
      setIsDisabledAddress(false);
    } else {
      setIsDisabledAddress(true);
    }
  }, [provinceId, districtId, wardId]);

  return (
    <>
      <Head>
        <title>Techwave - Register</title>
      </Head>
      <div className={Styles["container"]}>
        <Toaster />
        <header className={Styles["header"]}>
          <nav className={Styles["nav"]}>
            <div className={Styles["nav-left"]}>
              {/* <Link href="/">
                <Image src={images.techwave2} width={100} height={80} alt="" />
              </Link> */}
            </div>
            <div className={Styles["nav-right"]}>
              <ul>
                <li
                  className={Styles["active"]}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Login
                </li>
                <li
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                >
                  Register
                </li>
                {/* <li
                  onClick={() => {
                    router.push("/auth/vendor-register");
                  }}
                >
                  Vendor Register
                </li> */}
                <li
                  onClick={() => {
                    router.push("/auth/forgot-password");
                  }}
                >
                  Forgot pass
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className={Styles["login"]}>
          <div className={Styles["left"]}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={Styles["form-container"]}
            >
              <div className={Styles["top"]}>
                <h2 style={{ color: "white" }}>User Register</h2>
                <h4 style={{ color: "white" }}>Please fill out the form</h4>
              </div>
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập username",
                    },
                  ]}
                >
                  <Input className={Styles["input"]} placeholder="Username" />
                </Form.Item>
              </div>
              <div>
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
                  <input
                    className={Styles["input"]}
                    placeholder="Họ và tên"
                    {...register("fullName")}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )} */}
              <div>
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
                  <input className={Styles["input"]} placeholder="Email" />
                </Form.Item>
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )} */}
              <div>
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
                  <input
                    className={Styles["input"]}
                    placeholder="Số điện thoại"
                    // {...register("phoneNumber")}
                  />
                </Form.Item>
              </div>

              <div className={Styles["alt-input"]} style={{ color: "white" }}>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={gender}
                  size="lg"
                  onChange={onChangeGender}
                >
                  <Radio key={"Nam"} value={"Nam"} style={{ color: "white" }}>
                    Nam
                  </Radio>
                  <Radio key={"Nữ"} value={"Nữ"} style={{ color: "white" }}>
                    Nữ
                  </Radio>
                </Radio.Group>{" "}
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.phoneNumber.message}
                </p>
              )} */}
              <div className={Styles["alt-input"]}>
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
                    value={provinceId}
                    placeholder={"Tỉnh thành"}
                    dropdownStyle={{ width: "430px", zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    className={`phone-input-selector `}
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
              <div className={Styles["alt-input"]}>
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
                    value={districtId}
                    placeholder={"Quận huyện"}
                    dropdownStyle={{ width: "430px", zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectDistrict}
                    disabled={isDisabledDistricts}
                    className={`phone-input-selector `}
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
              <div className={Styles["alt-input"]}>
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
                    dropdownStyle={{ width: "430px", zIndex: "99999999" }}
                    placement="bottomRight"
                    labelInValue={true}
                    showSearch
                    onChange={handleChangeSelectWard}
                    disabled={isDisabledWards}
                    className={`phone-input-selector `}
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
              <div className={"text-area-wrapper"}>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập địa chỉ cụ thể",
                    },
                  ]}
                >
                  <TextArea
                    className={Styles["textarea"]}
                    placeholder="Địa chỉ cụ thể"
                    autoSize={{
                      minRows: 2,
                      maxRows: 6,
                    }}
                    maxLength={100}
                    showCount
                    allowClear
                    disabled={isDisabledAdress}
                    rootClassName="text-area-adress-register"
                    // {...register("phoneNumber")}
                  />
                </Form.Item>
              </div>
              <div className={Styles["alt-input"]}>
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
                    style={{
                      backgroundColor: "#88A3D2",
                      border: "none",
                      height: "45px",
                      width: "100%",
                      color: "white",
                    }}
                    popupClassName="date-register-dropdown-select"
                    onChange={onChange}
                    placeholder="Ngày sinh"
                    disabledDate={disabledDate}
                    // {...register("date")}
                  />
                </Form.Item>
              </div>
              {/* {errors.date && (
                <p className={Styles["validate-message"]}>
                  {errors.date.message}
                </p>
              )} */}
              <div>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mật khẩu",
                    },
                  ]}
                >
                  <input
                    className={Styles["input"]}
                    type="password"
                    placeholder="Password"
                    // {...register("password")}
                  />
                </Form.Item>
              </div>
              <div className={Styles["alt-input"]} style={{ color: "white" }}>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={role}
                  size="lg"
                  onChange={onChangeRole}
                >
                  <Radio key={3} value={3} style={{ color: "white" }}>
                    User
                  </Radio>
                  <Radio key={2} value={2} style={{ color: "white" }}>
                    Vendor
                  </Radio>
                </Radio.Group>{" "}
              </div>
              {/* {errors.password && (
                <p className={Styles["validate-message"]}>
                  {errors.password.message}
                </p>
              )} */}
              {/* <div className="forget" style={{ marginTop: "10px" }}>
                <a href="#" style={{ textDecoration: "none" }}>
                  Forget password?
                </a>
              </div> */}
              <p
                className={Styles["validate-message"]}
                style={{ marginBottom: "20px", display: "none" }}
                ref={messRef}
              >
                Yêu cầu điền đủ thông tin
              </p>
              <div className={Styles["btn"]}>
                <button type="submit">Resgister</button>
              </div>
              {/* <div className="or">
                <p style={{ color: "white" }}>Or Login with</p>
              </div> */}
              {/* <div className="icon">
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <FacebookIcon />
                  Facebook
                </a>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <GoogleIcon />
                  Google
                </a>
              </div> */}
            </Form>
          </div>
          <div className={Styles["right"]}>
            <Image src={images.loginBg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
