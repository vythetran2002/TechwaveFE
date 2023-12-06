import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
// import SearchIcon from "@mui/icons-material/Search";
// import dynamic from "next/dynamic";
// import { Button } from "antd";
import PermissionList from "@/components/ui/admin/PermissionList/PermissionList";
// import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import AddCateDialog from "@/components/ui/admin/dialog/addCate/AddCateDialog";
// import EditCateDialog from "@/components/ui/admin/dialog/editCate/EditUserDialog";
// import EditImageDialog from "@/components/ui/EditImageDialog/EditImageDialog";
// import images from "@/assets/images";
import useFetchPermission from "@/api/admin/useFetchPermission";
import { EditPermission } from "@/api/admin/EditPermission";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";

function Index() {
  const [isEdtiMode, setIsEditMode] = useState(false);
  const [cookie] = useCookies();
  const [admin, setAdmin] = useState();
  const [vendor, setVendor] = useState();
  const [user, setUser] = useState();
  const per = useFetchPermission();

  const updateEditMode = () => {
    if (isEdtiMode) {
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
      updateAdmin(per.data.data[0]);
      updateVendor(per.data.data[1]);
      updateUser(per.data.data[2]);
    }
  };

  const turnOffEditMode = () => {
    setIsEditMode(false);
  };

  const updateAdmin = (value) => {
    setAdmin(value);
  };
  const updateVendor = (value) => {
    setVendor(value);
  };
  const updateUser = (value) => {
    setUser(value);
  };

  const handleSubmit = () => {
    let temp = [admin, vendor, user];
    // console.log(temp);
    const message = EditPermission(temp, cookie["token"]);
    console.log(message);
    window.location.reload();
  };

  // useEffect(() => {
  //   console.log(admin);
  // }, [admin]);
  if (per.isLoading) {
    return <></>;
  }
  if (per.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Techwave - Admin</title>
        </Head>
        <AdminLayout path="/userpermission">
          <Toaster />
          <div className={Styles["user-managemnent-container"]}>
            <span style={{ fontWeight: "800", fontSize: "22px" }}>
              USER PERMISSION
            </span>

            <div className={Styles["user-search-add-container"]}>
              {isEdtiMode == false ? (
                <button
                  className={Styles["role-update-button"]}
                  onClick={updateEditMode}
                >
                  Cập nhật quyền
                </button>
              ) : (
                <button
                  className={Styles["role-update-button"]}
                  disabled
                  style={{
                    opacity: "0",
                    cursor: "auto",
                  }}
                >
                  Cập nhật quyền
                </button>
              )}
            </div>

            <PermissionList
              admin={admin}
              user={user}
              vendor={vendor}
              editMode={isEdtiMode}
              updateAdmin={updateAdmin}
              updateVendor={updateVendor}
              updateUser={updateUser}
              per={per.data}
            />

            {isEdtiMode == true && (
              <div
                className={Styles["submit-btn-container"]}
                onClick={updateEditMode}
              >
                <button
                  onClick={handleSubmit}
                  className={Styles["submit-permission-btn"]}
                >
                  Lưu
                </button>
                <button
                  style={{ backgroundColor: "#2d3748" }}
                  className={Styles["submit-permission-btn"]}
                  onClick={turnOffEditMode}
                >
                  Huỷ
                </button>
              </div>
            )}
          </div>
        </AdminLayout>
      </>
    );
}

export default Index;
