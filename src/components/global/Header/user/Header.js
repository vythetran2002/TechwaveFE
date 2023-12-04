import React from "react";
import Styles from "./styles.module.css";
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets/images";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { LogOutAccount } from "@/api/auth/LogOutAcount";

function UserHeader() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const route = useRouter();
  const logout = async () => {
    const message = LogOutAccount(cookies["token"]);
    removeCookie("token");
    console.log(message);
    route.push("/auth/login");
    toast.success("Logged out");
  };

  return (
    <>
      <div className={Styles["header-container"]}>
        <div className={Styles["header-wrapper"]}>
          <Link href={"/"}>
            <Image
              src={images.techwave}
              className={Styles["logo"]}
              alt=""
            ></Image>
          </Link>
          <div className={Styles["notify-avatar-container"]} onClick={logout}>
            <div className={Styles["notify-icon-wrapper"]}>
              <LogoutOutlinedIcon />
            </div>
            <div className={Styles["header-wrapper"]}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
