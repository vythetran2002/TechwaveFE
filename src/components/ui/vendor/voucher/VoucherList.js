import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import VoucherItem from "./VoucherItem";
import { useEffect } from "react";
import useFetchProductsByPage from "@/api/vendor/useFetchProductsByPage";
import { Textfit } from "react-textfit";
import useFetchVouchersVendor from "@/api/vendor/useFetchVouchersVendor";
import { Empty } from "antd";

function VoucherList(props) {
  const vouchers = useFetchVouchersVendor();

  return (
    <>
      <div className={Styles["item-list-container"]}>
        <div className={Styles["item-list-heading-container"]}>
          <div className={Styles["id-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Tên</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["fullname-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Số Lượng</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["email-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Giá giảm</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["email-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Đơn từ</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["dob-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Giảm tối đa</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["gender-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Ngày hết hạn</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["status-wrapper"]}>
            <span className={Styles["head-title"]}>
              <Textfit mode="single">Trạng thái</Textfit>
            </span>
            <SortOutlinedIcon />
          </div>
        </div>
        {vouchers.isLoading && <>Loading</>}
        {vouchers.isError && <>Error</>}
        {vouchers.data ? (
          vouchers.data.data.map((voucher, index) => {
            return (
              <React.Fragment key={index}>
                <VoucherItem
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
        {/* <React.Fragment>
          <VoucherItem
            token={props.token}
            updateProduct={props.updateProduct}
            handleOpenDialog={props.handleOpenDialog}
          />
        </React.Fragment> */}
      </div>
      {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={10} size="large" />
        </div> */}
    </>
  );
}

export default VoucherList;
