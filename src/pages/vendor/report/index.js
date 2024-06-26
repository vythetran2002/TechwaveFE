import React, { useEffect, useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
// import dynamic from "next/dynamic";
// import { Button } from "antd";
import { Select } from "antd";
import ReportList from "@/components/ui/admin/ReportList/ReportList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import AddCateDialog from "@/components/ui/admin/dialog/addCate/AddCateDialog";
// import EditCateDialog from "@/components/ui/admin/dialog/editCate/EditUserDialog";
// import EditImageDialog from "@/components/ui/EditImageDialog/EditImageDialog";
// import images from "@/assets/images";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportPopup from "@/components/ui/vendor/report/popup/ReportPopup";
import { Pagination } from "@mui/material";

function Index() {
  // states

  const [open, setOpen] = useState(false);
  const [report, setReport] = useState({});
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();

  const updateReport = (value) => {
    let temp = { ...value };
    setReport(temp);
  };

  const handlingOpen = () => {
    setOpen(true);
  };

  const handlingClose = () => {
    setOpen(false);
  };

  const updateQuantity = (value) => {
    setQuantity(value);
  };

  const handlePaging = async (value, pageSize) => {
    await setPage(pageSize);
  };

  const updateMax = (value) => {
    setMax(value);
  };

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path="/report">
        <div className={Styles["user-managemnent-container"]}>
          <span style={{ fontWeight: "800", fontSize: "22px" }}>
            QUẢN LÝ ĐƠN BÁO CÁO
          </span>
          <div className={Styles["user-search-add-container"]}>
            <div className={Styles["user-search-filter-container"]}>
              <div className={Styles["user-search-input-wrapper"]}>
                <SearchIcon />
                <input
                  placeholder="search by ..."
                  className={Styles["user-search-input"]}
                ></input>
              </div>
              <button className={Styles["user-filter-button-wrapper"]}>
                <FilterListIcon />
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Filter
                </span>
              </button>
            </div>
          </div>
          <div className={Styles["markup-container"]}>
            {/* <div className={Styles["markup-item"]}>
              <span>Foundation</span>
              <ClearOutlinedIcon className={Styles["markup-icon"]} />
            </div>
            <div className={Styles["markup-item"]}>
              <span>HaTHH</span>
              <ClearOutlinedIcon className={Styles["markup-icon"]} />
            </div> */}
            <Select
              onChange={updateQuantity}
              defaultValue={quantity}
              style={{ width: 100 }}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
                { value: 6, label: "6" },
                { value: 7, label: "7" },
              ]}
            />
          </div>

          <ReportList
            updateMax={updateMax}
            limit={quantity}
            page={page}
            updateReport={updateReport}
            handleOpen={handlingOpen}
          />
        </div>
        <Dialog
          className="__className_020227"
          fullWidth={true}
          maxWidth="md"
          open={open}
          onClose={handlingClose}
        >
          <DialogContent>
            <ReportPopup report={report} />
          </DialogContent>
        </Dialog>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {page && (
            <Pagination onChange={handlePaging} count={max} size="large" />
          )}
        </div>
      </VendorLayout>
    </>
  );
}

export default Index;
