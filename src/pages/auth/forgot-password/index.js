import React from "react";
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
const LoginScheme = Yup.object().shape({
  email: Yup.string()
    .email("Mời nhập đúng Email")
    .required("Vui lòng nhập thông tin"),
  // password: Yup.string()
  //   .max(20, "Mật khẩu quá dài")
  //   .required("Vui lòng nhập thông tin"),
});

function Index() {
  const router = useRouter();
  const message = null;

  const handleLogin = async (data) => {
    const email = data.email;

    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = await axios.post(
        "http://localhost:3000/api/forgotPassword",
        {
          email,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      router.push("/auth/login");
      console.log(response.data);

      // // Lấy token từ response
      // const { token } = response.data.data;
      // console.log(response.data);
      // // Lưu token vào localStorage
      // localStorage.setItem("token", access_token);
      // // Redirect người dùng hoặc làm mới trạng thái của component/app
      // // ...
      // console.log("Đăng nhập thành công");
      // toast.success("Đăng nhập thành công");
      // // router.push("/");
      // Kiểm tra xem response có đúng định dạng không và có chứa access_token hay không
      // if (
      //   response.data &&
      //   response.data.data &&
      //   response.data.data.access_token
      // ) {
      //   // Lấy access_token từ response
      //   const access_token = response.data.data.access_token;
      //   console.log(response.data);
      //   // Lưu access_token vào localStorage
      //   localStorage.setItem("token", access_token);
      //   // Redirect người dùng hoặc làm mới trạng thái của component/app
      //   // ...
      //   console.log("Đăng nhập thành công");
      //   toast.success("Đăng nhập thành công");
      //   router.push("/");
      // } else {
      //   // Xử lý trường hợp không tìm thấy access_token trong response
      //   console.log("Token không tồn tại trong response");
      //   toast.error("Đăng nhập không thành công.");
      // }
    } catch (error) {
      toast.error("Email không tồn tại");
      // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
    }
  };

  const submit = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginScheme),
  });

  return (
    <>
      <Head>
        <title>Techwave - Login</title>
      </Head>
      <div className="container" style={{ height: "100vh" }}>
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
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="top">
                <h2 style={{ color: "white" }}>Forgot password</h2>
                <h4 style={{ color: "white" }}>Please fill out the form</h4>
              </div>
              <div className="input">
                <input placeholder="Email" {...register("email")} />
              </div>
              {errors.email && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )}

              {/* <div className="forget" style={{ marginTop: "10px" }}>
                <a href="#" style={{ textDecoration: "none" }}>
                  Forget password?
                </a>
              </div> */}
              <div className="btn">
                <button type="submit">Submit</button>
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
