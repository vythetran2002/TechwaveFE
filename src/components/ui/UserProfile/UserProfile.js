import React from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import useFetchUserProfileById from "@/api/user/useFetchUserProfileById";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const handleRole = (id) => {
  if (id == 1) {
    return <>Admin</>;
  }
  if (id == 2) {
    return <>Vendor</>;
  }
  if (id == 3) {
    return <>User</>;
  }
};

function UserProfile(props) {
  const { id } = props;
  const user = useFetchUserProfileById(id);

  console.log(user);

  if (user.isLoading) {
    return <>Loading</>;
  }
  if (user.isError) {
    return <>Error</>;
  }
  //   console.log(id);
  else
    return (
      <div className={roboto.className}>
        <div className={Styles["user-container"]}>
          <div className={Styles["avatar-container"]}>
            {user.data.avatar != null ? (
              <Image
                src={user.data.avatar}
                width={100}
                height={100}
                priority
                alt=""
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Image
                src={images.nonAvatar}
                width={200}
                height={200}
                priority
                alt=""
                style={{ borderRadius: "50%" }}
              />
            )}
            <span className={Styles["name-container"]}>
              {user.data.username}
            </span>
          </div>
          <div className={Styles["info-container"]}>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Họ và tên:
              </span>
              <span className={Styles["col"]}>{user.data.fullname}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Email:
              </span>
              <span className={Styles["col"]}>{user.data.email}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Role:
              </span>
              <span className={Styles["col"]}>
                {handleRole(user.data.id_permission)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserProfile;
