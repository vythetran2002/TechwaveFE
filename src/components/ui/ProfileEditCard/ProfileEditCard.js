import React from "react";
import Styles from "./styles.module.css";
function ProfileEditCard() {
  return (
    <>
      <div className={Styles["profile-edit-card-container"]}>
        <div className={Styles["profile-edit-card-container"]}>
          <div className={Styles["profile-edit-form-wrapper"]}>
            <div className={Styles["profile-left-edit-form-wrapper"]}>
              <div className={Styles["profile-avatar-container"]}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEditCard;
