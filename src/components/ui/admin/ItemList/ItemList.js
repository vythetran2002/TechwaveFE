import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ListItem from "./ListItem";
import { Pagination } from "@mui/material";
import useFetchAccount from "@/api/admin/useFetchAccount";
import { Empty } from "antd";

function ItemList(props) {
  const { status, limit, page, token, updatePage, updateMax } = props;

  const account = useFetchAccount(status, page, limit, token);
  console.log(account);

  const handleReload = () => {
    account.reload();
  };

  useEffect(() => {
    if (account.data) {
      console.log("---");
      updateMax(account.data.total);
    }
  }, [account.data]);

  if (account.isLoading) {
    return <>Loading</>;
  }
  if (account.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>ID</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Họ và tên</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Email</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày sinh</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Giới tính</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["role-wrapper"]}>
              <span className={Styles["head-title"]}>Role</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Trạng thái</span>
              <SortOutlinedIcon />
            </div>
          </div>
          <div>
            {account.data.results.length != 0 ? (
              account.data.results.map((account, index) => {
                return (
                  <React.Fragment key={"account" + index}>
                    <ListItem
                      token={props.token}
                      updateAccount={props.updateAccount}
                      updateId={props.updateId}
                      status={props.status}
                      account={account}
                      handleReload={handleReload}
                      handleOpenDialog={props.handleOpenDialog}
                      handleCloseDialog={props.handleCloseDialog}
                      handleOpenDetailDialog={props.handleOpenDetailDialog}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <div style={{ padding: "20px 0 20px 0" }}>
                <Empty />
              </div>
            )}
          </div>
        </div>
      </>
    );
}

export default ItemList;
