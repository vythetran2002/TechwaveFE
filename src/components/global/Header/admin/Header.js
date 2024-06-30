import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import Link from "next/link";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useFetchAdminProfile from "@/api/admin/useFetchAdminProfile";
import Cookies from "js-cookie";
import { LogOutAccount } from "@/api/auth/LogOutAcount";
import { useRouter } from "next/router";

function AdminHeader() {
  const profile = useFetchAdminProfile();
  // console.log(profile);
  const route = useRouter();
  const token = Cookies.get("token");

  const handlingLogout = async () => {
    const message = LogOutAccount(token);
    await Cookies.remove("token");
    console.log(message);
    route.push("/auth/login");
    // toast.success("logged out");
  };

  if (profile.isLoading) {
    return <>Loading</>;
  }
  if (profile.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={Styles["nav-container"]}>
          <div className={Styles["avatar-container"]}>
            {profile.data.avatar != null ? (
              <>
                <Image
                  width={200}
                  height={200}
                  src={profile.data.avatar}
                  alt=""
                  priority={true}
                  className={Styles["avatar"]}
                />
              </>
            ) : (
              <>
                <Image
                  width={200}
                  height={200}
                  src={images.nonAvatar}
                  alt=""
                  priority={true}
                  className={Styles["avatar"]}
                />
              </>
            )}
            <div className={Styles["avatar-dropdown-container"]}>
              <div className={Styles["info"]}>
                <span className={Styles["info-name"]}>
                  {profile.data.username}
                </span>
                <span className={Styles["info-email"]}>
                  {profile.data.email}
                </span>
              </div>
              <div className={Styles["nav-avt-list"]}>
                <Link
                  href={"/admin/profile"}
                  className={Styles["nav-avatar-item"]}
                >
                  <AccountCircleOutlinedIcon />
                  <span>Tài khoản của tôi</span>
                </Link>
                <Link
                  href={"/admin/profile"}
                  className={Styles["nav-avatar-item"]}
                >
                  <EditNoteOutlinedIcon />
                  <span>Đổi mật khẩu</span>
                </Link>
                {/* <Link href={"/admin"} className={Styles["nav-avatar-item"]}>
                  <SettingsOutlinedIcon />
                  <span>Cài đặt</span>
                </Link> */}
              </div>
              <div
                onClick={handlingLogout}
                className={Styles["nav-avt-logout"]}
              >
                <PowerSettingsNewOutlinedIcon />
                <span>Đăng xuất</span>
              </div>
            </div>
          </div>
          <div className={Styles["help-container"]}>
            <HelpOutlineOutlinedIcon />
            <span>Trợ giúp</span>
          </div>

          <div className={Styles["notify-wrapper"]}>
            <NotificationsOutlinedIcon />
            <span>Thông báo</span>
            <div className={Styles["notify-container"]}>
              <div className={Styles["header-notify-container"]}>
                <span>Thông báo mới nhận</span>
              </div>
              <div className={Styles["notify-body-container"]}>
                <div className={Styles["notify-item-container"]}>
                  <div className={Styles["notify-item-atavar-container"]}>
                    {profile.data.avatar != null ? (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src={profile.data.avatar}
                          alt=""
                          priority={true}
                          className={Styles["notify-avatar"]}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src={images.nonAvatar}
                          alt=""
                          priority={true}
                          className={Styles["notify-avatar"]}
                        />
                      </>
                    )}
                  </div>
                  <Link
                    href={"/admin"}
                    className={Styles["notify-content-container"]}
                  >
                    <span className={Styles["notify-content-heading"]}>
                      Báo cáo tài khoản
                    </span>
                    <span className={Styles["notify-content-desc"]}>
                      username muốn báo cáo tài khoản người dùng
                    </span>
                  </Link>
                </div>
                <div className={Styles["notify-item-container"]}>
                  <div className={Styles["notify-item-atavar-container"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      alt=""
                      priority={true}
                      className={Styles["notify-avatar"]}
                    />
                  </div>
                  <Link
                    href={"/admin"}
                    className={Styles["notify-content-container"]}
                  >
                    <span className={Styles["notify-content-heading"]}>
                      Báo cáo tài khoản
                    </span>
                    <span className={Styles["notify-content-desc"]}>
                      username muốn báo cáo tài khoản người dùng
                    </span>
                  </Link>
                </div>
                <div className={Styles["notify-item-container"]}>
                  <div className={Styles["notify-item-atavar-container"]}>
                    <Image
                      width={200}
                      height={200}
                      src={images.monster}
                      alt=""
                      priority={true}
                      className={Styles["notify-avatar"]}
                    />
                  </div>
                  <Link
                    href={"/admin"}
                    className={Styles["notify-content-container"]}
                  >
                    <span className={Styles["notify-content-heading"]}>
                      Báo cáo tài khoản
                    </span>
                    <span className={Styles["notify-content-desc"]}>
                      username muốn báo cáo tài khoản người dùng
                    </span>
                  </Link>
                </div>
              </div>
              <div className={Styles["footer-notify-container"]}>
                <Link
                  href={"/admin"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default AdminHeader;
