import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import VoucherItemAdmin from "./VoucherItemAdmin";
import { Pagination } from "@mui/material";
import useFetchAccount from "@/api/admin/useFetchAccount";
import { Empty } from "antd";
import useFetchVouchersAdmin from "@/api/admin/useFetchVoucherAdmin";

function VoucherListAdmin(props) {
  const { status, limit, page, token, updatePage, updateMax } = props;
  const vouchers = useFetchVouchersAdmin();

  // useEffect(() => {
  //   if (account.data) {
  //     updateMax(account.data.total);
  //   }
  // }, [account.data]);

  if (vouchers.isLoading) {
    return <>Loading</>;
  }
  if (vouchers.isError) {
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
            {vouchers.isLoading && <>Loading</>}
            {vouchers.isError && <>Error</>}
            {vouchers.data ? (
              vouchers.data.data.map((voucher, index) => {
                return (
                  <React.Fragment key={index}>
                    <VoucherItemAdmin
                      mutate={vouchers.mutate}
                      data={voucher}
                      token={props.token}
                      updateVoucher={props.updateVoucher}
                      handleOpenDialog={props.handleOpenDialog}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <>
                <Empty />
              </>
            )}
          </div>
        </div>
      </>
    );
}

export default VoucherListAdmin;
