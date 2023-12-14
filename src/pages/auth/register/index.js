import React, { useState } from "react";
import { useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import Head from "next/head";
import images from "@/assets/images";
import Link from "next/link";
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

function checkAllProperties(info) {
  // Kiểm tra xem tất cả giá trị của thuộc tính trong đối tượng có giá trị (không phải null hoặc undefined) hay không
  return Object.values(info).every(
    (value) => value !== null && value !== undefined
  );
}

function Index() {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [gender, setGender] = useState("Nam");
  const [pass, setPass] = useState();
  const [role, setRole] = useState("user");

  const messRef = useRef();

  const onChangeGender = ({ target: { value } }) => {
    setGender(value);
  };

  const onChangeRole = ({ target: { value } }) => {
    setRole(value);
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
      toast.error("Nhập đầy đủ thông tin");
    }
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

  return (
    <>
      <Head>
        <title>Techwave - Register</title>
      </Head>
      <div className="container">
        <Toaster />
        <header className="header">
          <nav className="nav">
            <div className="nav-left">
              {/* <Link href="/">
                <Image src={images.techwave2} width={100} height={80} alt="" />
              </Link> */}
            </div>
            <div className="nav-right">
              <ul>
                <li
                  className="active"
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
        <div className="login">
          <div className="left">
            <form
              onSubmit={handleResgiter}
              className={Styles["form-container"]}
            >
              <div className="top">
                <h2 style={{ color: "white" }}>User Register</h2>
                <h4 style={{ color: "white" }}>Please fill out the form</h4>
              </div>
              <div className="input">
                <input
                  placeholder="Username"
                  {...register("Username")}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <input
                  placeholder="Họ và tên"
                  {...register("fullName")}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )} */}
              <div className="input">
                <input
                  placeholder="Email"
                  // {...register("email")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )} */}
              <div className="input">
                <input
                  placeholder="Số điện thoại"
                  // {...register("phoneNumber")}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="input" style={{ color: "white" }}>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={gender}
                  size="lg"
                  onChange={onChangeGender}
                >
                  <Radio value={"Nam"} style={{ color: "white" }}>
                    Nam
                  </Radio>
                  <Radio value={"Nữ"} style={{ color: "white" }}>
                    Nữ
                  </Radio>
                </Radio.Group>{" "}
              </div>
              {/* {errors.fullName && (
                <p className={Styles["validate-message"]}>
                  {errors.phoneNumber.message}
                </p>
              )} */}
              <div className="input">
                <textarea
                  className={Styles.input}
                  placeholder="Địa chỉ"
                  // {...register("phoneNumber")}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <DatePicker
                  style={{
                    backgroundColor: "#88A3D2",
                    border: "none",
                    color: "white",
                    height: "45px",
                    width: "100%",
                    color: "white",
                  }}
                  onChange={onChange}
                  placeholder="Ngày sinh"

                  // {...register("date")}
                />
              </div>
              {/* {errors.date && (
                <p className={Styles["validate-message"]}>
                  {errors.date.message}
                </p>
              )} */}
              <div className="input">
                <input
                  type="password"
                  placeholder="Password"
                  // {...register("password")}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
              <div className="input" style={{ color: "white" }}>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={role}
                  size="lg"
                  onChange={onChangeRole}
                >
                  <Radio value={"user"} style={{ color: "white" }}>
                    User
                  </Radio>
                  <Radio value={"vendor"} style={{ color: "white" }}>
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
              <div className="btn">
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
            </form>
          </div>
          <div className="right">
            <Image src={images.loginBg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
