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
        process.env.NEXT_PUBLIC_API_URL + "/api/forgotPassword",
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
    <div className={Styles["container"]}>
      <Head>
        <title>Techwave - Login</title>
      </Head>
      <div style={{ height: "100vh" }}>
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
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className={Styles["top"]}>
                <h2 style={{ color: "white" }}>Forgot password</h2>
                <h4 style={{ color: "white" }}>Please fill out the form</h4>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <input
                    className={Styles["input"]}
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                <div className={Styles["btn"]}>
                  <button type="submit">Submit</button>
                </div>
              </div>

              {errors.email && (
                <p className={Styles["validate-message"]}>
                  {errors.email.message}
                </p>
              )}
            </form>
          </div>
          <div className={Styles["right"]}>
            <Image src={images.loginBg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
