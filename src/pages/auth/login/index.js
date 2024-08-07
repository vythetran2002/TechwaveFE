import React from "react";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import images from "@/assets/images";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Styles from "../styles.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const LoginScheme = Yup.object().shape({
  email: Yup.string()
    .email("Mời nhập đúng Email")
    .required("Vui lòng nhập thông tin"),
  password: Yup.string()
    .max(20, "Mật khẩu quá dài")
    .required("Vui lòng nhập thông tin"),
});

const maxAge = 7200;

function Index() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async (data, e) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;

    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/login",
        {
          email,
          password,
        }
      );
      const promiseResult = response;

      toast.promise(promiseResult, {
        loading: "Loading...",
        success: (response) => {
          // Lấy access_token từ response
          const access_token = response.data.data.access_token;
          // console.log(response.data);
          // Lưu access_token vào cookie
          Cookies.set("token", access_token, { expires: 1 / 24 });
          //setCookie("token", access_token);
          // Redirect người dùng hoặc làm mới trạng thái của component/app
          // ...

          //auth
          switch (response.data.data.groupWithRole.permission_id) {
            case 3:
              router.push("/");
              return "Đăng nhập thành công";
              break;
            case 2:
              router.push("/vendor/home");
              return "Đăng nhập thành công";
              break;
            case 1:
              router.push("/admin/home");
              return "Đăng nhập thành công";
              break;
            default:
              break;
          }
        },
        error: "Đăng nhập thất bại",
      });

      // if (
      //   response.data &&
      //   response.data.data &&
      //   response.data.data.access_token
      // ) {
      //   // Lấy access_token từ response
      //   const access_token = response.data.data.access_token;
      //   console.log(response.data);
      //   // Lưu access_token vào cookie
      //   Cookies.set("token", access_token);
      //   //setCookie("token", access_token);
      //   // Redirect người dùng hoặc làm mới trạng thái của component/app
      //   // ...

      //   //auth
      //   switch (response.data.data.groupWithRole.permission_id) {
      //     case 3:
      //       router.push("/");
      //       break;
      //     case 2:
      //       router.push("/vendor/home");
      //       break;
      //     case 1:
      //       router.push("/admin/home");
      //       break;
      //     default:
      //       break;
      //   }
      // } else {
      //   // Xử lý trường hợp không tìm thấy access_token trong response
      //   console.log("Token không tồn tại trong response");
      //   toast.error("Đăng nhập không thành công.");
      // }
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      toast.error("Something's wrong");
      // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginScheme),
  });

  // useEffect(() => {
  //   // Lấy giá trị từ cookie
  //   const storedData = cookies["yourKey"];
  //   console.log("Data from cookie:", storedData);
  // }, [cookies]);

  return (
    <div className={Styles["container"]}>
      <Head>
        <title>Techwave - Login</title>
      </Head>
      <div>
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
                  className="active"
                  onClick={() => {
                    window.location.assign("/");
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
                <h2 style={{ color: "white" }}>Welcome to Techwave</h2>
                <h4 style={{ color: "white" }}>Please login</h4>
              </div>
              <div className={Styles["login-username-pass-container"]}>
                <div>
                  <input
                    className={Styles["input"]}
                    placeholder="Email"
                    {...register("email")}
                    style={{
                      padding: "5px 20px",
                    }}
                  />
                </div>
                {errors.email && (
                  <p className={Styles["validate-message"]}>
                    {errors.email.message}
                  </p>
                )}
                <div>
                  <input
                    style={{
                      padding: "5px 20px",
                    }}
                    type="password"
                    className={Styles["input"]}
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className={Styles["validate-message"]}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className={Styles["forget"]} style={{ marginTop: "10px" }}>
                <Link
                  href="/auth/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  Forget password?
                </Link>
              </div>
              <div className={Styles["btn"]}>
                <button className={Styles["button"]} type="submit">
                  Login
                </button>
              </div>
              {/* <div className={Styles["or"]}>
                <p style={{ color: "white" }}>Or Login with</p>
              </div>
              <div className={Styles["icon"]}>
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
          <div className={Styles["right"]}>
            <Image src={images.loginBg} alt="" priority />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
