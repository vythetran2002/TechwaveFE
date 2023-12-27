import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import PermissionItem from "./PermissionItem";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import useFetchPermission from "@/api/admin/useFetchPermission";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Select } from "antd";

function PermissionList(props) {
  const {
    editMode,
    updateAdmin,
    updateVendor,
    updateUser,
    admin,
    user,
    vendor,
    per,
  } = props;

  // console.log(per);
  // console.log(editMode);
  // if (per.data) {
  //   updateAdmin(per.data.data[0]);
  //   updateVendor(per.data.data[1]);
  //   updateUser(per.data.data[2]);
  // }

  const options = [
    {
      value: "FULL_ACCESS",
      label: "FULL_ACCESS",
    },
    {
      value: "CREATE",
      label: "CREATE",
    },
    {
      value: "VIEW",
      label: "VIEW",
    },
    {
      value: "MODIFY",
      label: "MODIFY",
    },
    {
      value: "ACCESS_DENIED",
      label: "ACCESS_DENIED",
    },
  ];

  const fullAccess = (
    <div className={Styles["list-item-name-wrapper"]}>
      <GradeOutlinedIcon />
      <span style={{ width: "100%" }}>Full Access</span>
    </div>
  );

  const fullAccessEdit = (
    <div className={Styles["list-item-name-wrapper"]}>
      {/* <GradeOutlinedIcon /> */}
      <Select
        style={{ width: "100%" }}
        options={options}
        defaultValue="FULL_ACCESS"
      />
    </div>
  );

  const create = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        <AddCircleOutlineOutlinedIcon />
        <span>Create</span>
      </div>
    </>
  );

  const createEdit = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        {/* <AddCircleOutlineOutlinedIcon /> */}
        <Select
          style={{ width: "100%" }}
          options={options}
          defaultValue="CREATE"
        />
      </div>
    </>
  );

  const deny = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        <VisibilityOffOutlinedIcon />
        <span>Deny</span>
      </div>
    </>
  );

  const denyEdit = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        {/* <VisibilityOffOutlinedIcon /> */}
        <Select
          style={{ width: "100%" }}
          options={options}
          defaultValue="DENY"
        />
      </div>
    </>
  );

  const modify = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        <EditOutlinedIcon />
        <span>Modify</span>
      </div>
    </>
  );

  const modifyEdit = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        {/* <EditOutlinedIcon /> */}
        <Select
          style={{ width: "100%" }}
          options={options}
          defaultValue="MODIFY"
        />
      </div>
    </>
  );

  const view = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        <VisibilityOutlinedIcon />
        <span>View</span>
      </div>
    </>
  );

  const viewEdit = (
    <>
      <div className={Styles["list-item-name-wrapper"]}>
        {/* <VisibilityOutlinedIcon /> */}
        <Select
          style={{ width: "100%" }}
          options={options}
          defaultValue="VIEW"
        />
      </div>
    </>
  );

  const textToJsx = (text) => {
    if (text == "FULL_ACCESS") {
      return fullAccess;
    } else if (text == "CREATE") {
      return create;
    } else if (text == "VIEW") {
      return view;
    } else if (text == "MODIFY") {
      return modify;
    } else if (text == "ACCESS_DENIED") {
      return deny;
    }
  };

  const textToJsxEdit = (text) => {
    if (text == "FULL_ACCESS") {
      return fullAccessEdit;
    } else if (text == "CREATE") {
      return createEdit;
    } else if (text == "VIEW") {
      return viewEdit;
    } else if (text == "MODIFY") {
      return modifyEdit;
    } else if (text == "ACCESS_DENIED") {
      return denyEdit;
    }
  };

  const updateProductAdmin = (value) => {
    console.log("--------");
    let temp = { ...admin, Product: value };
    updateAdmin(temp);
  };

  const updateCateAdmin = (value) => {
    let temp = { ...admin, Category: value };
    updateAdmin(temp);
  };

  const updateAccountAdmin = (value) => {
    let temp = { ...admin, Account: value };
    updateAdmin(temp);
  };

  const updateReviewAdmin = (value) => {
    let temp = { ...admin, Review: value };
    updateAdmin(temp);
  };

  const updateReportAdmin = (value) => {
    let temp = { ...admin, Report: value };
    updateAdmin(temp);
  };

  const updateProductVendor = (value) => {
    let temp = { ...vendor, Product: value };
    updateVendor(temp);
  };

  const updateCateVendor = (value) => {
    let temp = { ...vendor, Category: value };
    updateVendor(temp);
  };

  const updateAccountVendor = (value) => {
    let temp = { ...vendor, Account: value };
    updateVendor(temp);
  };

  const updateReviewVendor = (value) => {
    let temp = { ...vendor, Review: value };
    updateVendor(temp);
  };

  const updateReportVendor = (value) => {
    let temp = { ...vendor, Report: value };
    updateVendor(temp);
  };

  const updateProductUser = (value) => {
    let temp = { ...user, Product: value };
    updateUser(temp);
  };

  const updateCategorytUser = (value) => {
    let temp = { ...user, Category: value };
    updateUser(temp);
  };

  const updateAccounttUser = (value) => {
    let temp = { ...user, Account: value };
    updateUser(temp);
  };

  const updateReviewtUser = (value) => {
    let temp = { ...user, Review: value };
    updateUser(temp);
  };

  const updateReporttUser = (value) => {
    let temp = { ...user, Report: value };
    updateUser(temp);
  };

  return (
    <>
      <div className={Styles["item-list-container"]}>
        <div className={Styles["item-list-heading-container"]}>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Tên quyền</span>
          </div>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Sản phẩm</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Danh mục</span>
          </div>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Tài khoản</span>
          </div>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Báo cáo</span>
          </div>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>Đánh giá</span>
          </div>
        </div>
        {editMode == false &&
          per.data &&
          per.data.map((per, index) => {
            {
              /* console.log(per); */
            }
            return (
              <React.Fragment key={"per" + index}>
                <PermissionItem
                  name={per.RoleName}
                  roles={[
                    textToJsx(per.Product),
                    textToJsx(per.Category),
                    textToJsx(per.Account),
                    textToJsx(per.Report),
                    textToJsx(per.Review),
                  ]}
                />
              </React.Fragment>
            );
          })}
        {/* 
          {
            editMode == true &&
            per.data.data &&
            per.data.data.map((per, index) => {
          
              return (
                <PermissionItem
                  key={per.permission_id}
                  name={per.RoleName}
                  roles={[
                    textToJsxEdit(per.Product),
                    textToJsxEdit(per.Category),
                    textToJsxEdit(per.Account),
                    textToJsxEdit(per.Report),
                    textToJsxEdit(per.Review),
                  ]}
                />
              );
            })
            } */}

        {editMode == true && (
          <>
            <div className={Styles["list-item-container"]}>
              <div className={Styles["list-item-id-wrapper"]}>ADMIN</div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"admin-product"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={admin.Product}
                  onChange={updateProductAdmin}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"admin-cate"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={admin.Category}
                  onChange={updateCateAdmin}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"admin-profile"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={admin.Account}
                  onChange={updateAccountAdmin}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"admin-report"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={admin.Report}
                  onChange={updateReportAdmin}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"admin-review"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={admin.Review}
                  onChange={updateReviewAdmin}
                />
              </div>
            </div>
            <div className={Styles["list-item-container"]}>
              <div className={Styles["list-item-id-wrapper"]}>VENDOR</div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"vendor-product"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={vendor.Product}
                  onChange={updateProductVendor}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"vendor-cate"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={vendor.Category}
                  onChange={updateCateVendor}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"vendor-profile"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={vendor.Account}
                  onChange={updateAccountVendor}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"vendor-report"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={vendor.Report}
                  onChange={updateReportVendor}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"vendor-review"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={vendor.Review}
                  onChange={updateReviewVendor}
                />
              </div>
            </div>
            <div className={Styles["list-item-container"]}>
              <div className={Styles["list-item-id-wrapper"]}>USER</div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"user-product"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={user.Product}
                  onChange={updateProductUser}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"user-cate"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={user.Category}
                  onChange={updateCategorytUser}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"user-profile"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={user.Account}
                  onChange={updateAccounttUser}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"user-report"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={user.Report}
                  onChange={updateReporttUser}
                />
              </div>
              <div className={Styles["list-item-id-wrapper"]}>
                <Select
                  key={"user-review"}
                  style={{ width: "100%" }}
                  options={options}
                  defaultValue={user.Review}
                  onChange={updateReviewtUser}
                />
              </div>
            </div>
          </>
        )}

        {/* <PermissionItem
            name={"Admin"}
            roles={[fullAccess, fullAccess, fullAccess, fullAccess, fullAccess]}
          />
          <PermissionItem
            name={"Vendor"}
            roles={[fullAccess, fullAccess, modify, view, create]}
          />
          <PermissionItem
            name={"User"}
            roles={[view, view, modify, create, create]}
          />{" "}
          */}
      </div>
      <div className={Styles["item-pagination-container"]}></div>
    </>
  );
}

export default PermissionList;
