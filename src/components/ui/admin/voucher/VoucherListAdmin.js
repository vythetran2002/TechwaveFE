import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import VoucherItemAdmin from "./VoucherItemAdmin";
import { Pagination } from "@mui/material";
import useFetchAccount from "@/api/admin/useFetchAccount";
import { Empty } from "antd";

function VoucherListAdmin(props) {
  const { status, limit, page, token, updatePage, updateMax } = props;
  const account = useFetchAccount(status, page, limit, token);

  useEffect(() => {
    if (account.data) {
      updateMax(account.data.total);
    }
  }, [account.data]);

  const handlingMutate = () => {
    account.mutate();
  };

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
              <span className={Styles["head-title"]}>Tên</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Số Lượng</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Giá Giảm</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Đơn Từ</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Giảm Tối Đa</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["role-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày Tạo</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày Hết Hạn</span>
              <SortOutlinedIcon />
            </div>
          </div>
          <div>
            {account.data.results.length != 0 ? (
              account.data.results.map((account, index) => {
                return (
                  <React.Fragment key={"account" + index}>
                    <VoucherItemAdmin
                      reload={handlingMutate}
                      token={props.token}
                      updateAccount={props.updateAccount}
                      updateId={props.updateId}
                      status={props.status}
                      account={account}
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

export default VoucherListAdmin;
