import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Styles from "../styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import CateList from "@/components/ui/admin/CateList/CateList";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCateDialog from "@/components/ui/admin/dialog/addCate/AddCateDialog";
import EditCateDialog from "@/components/ui/admin/dialog/editCate/EditCateDialog";
import EditImageDialog from "@/components/ui/EditImageDialog/EditImageDialog";
import images from "@/assets/images";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CateDetailDialog from "@/components/ui/admin/dialog/detailCate/CateDetailDialog";
import { useCookies } from "react-cookie";
import useFetchCategories from "@/api/vendor/useFetchCategories";
import { Select } from "antd";
import { Pagination } from "@mui/material";
import useFetch from "@/api/useFetch";
import { useRouter } from "next/router";
import CateListDetail from "@/components/ui/admin/CateListDetail/CateListDetail";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCateDialogDetail from "@/components/ui/admin/dialog/addCateDetail/AddCateDialogDetail";
import EditCateDialogDetail from "@/components/ui/admin/dialog/editCateDetail/EditCateDialog";
import useFetchCateGoryDetail from "@/api/admin/useFetchCategoryDetail";

function Index() {
  const [cookies] = useCookies();
  const router = useRouter();
  const query = router.query;
  //   console.log(query.slug);
  // states
  const [cateHeading, setCateHeading] = useState();
  const [isOpenAddCateDialog, setIsOpenAddCateDialog] = useState(false);
  const [isOpenEditCateDialog, setIsOpenEditCaterDialog] = useState(false);
  const [isOpenEditImgDialog, setIsOpenEditImgDialog] = useState(false);
  const [isOpenDetailCateDialog, setIsOpenDetailCateDialog] = useState(false);
  const [id, setId] = useState();
  const [cate, setCate] = useState();
  const [avatarSrc, setAvatarSrc] = useState(images.empty);
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState();
  const { mutate } = useFetchCateGoryDetail(
    query.slug,
    page,
    quantity,
    cookies["token"]
  );

  const handlingOpenAddCateDialog = () => {
    setIsOpenAddCateDialog(true);
  };

  const handlingCloseAddCateDialog = () => {
    setIsOpenAddCateDialog(false);
  };

  const handlingOpenEditCateDialog = () => {
    setIsOpenEditCaterDialog(true);
  };

  const handlingCloseEditCateDialog = () => {
    setIsOpenEditCaterDialog(false);
  };

  const handlingOpenEditImgDialog = () => {
    setIsOpenEditImgDialog(true);
  };

  const handlingCloseEditImgDialog = () => {
    setIsOpenEditImgDialog(false);
  };

  const handlingOpenDetailCate = () => {
    setIsOpenDetailCateDialog(true);
  };

  const handlingCloseDetailCate = () => {
    setIsOpenDetailCateDialog(false);
  };

  const updateCateHeading = (value) => {
    setCateHeading(value);
  };

  const updateCate = (cate) => {
    let temp = { ...cate };
    setCate(temp);
  };

  const updateId = (value) => {
    setId(value);
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
        <title>Techwave - Admin</title>
      </Head>
      <AdminLayout path="/cate">
        <div className={Styles["user-managemnent-container"]}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "800", fontSize: "22px" }}>
              {cateHeading && <>Quản lý danh mục {cateHeading}</>}
            </span>
            <Link
              href={"/admin/cate"}
              className={Styles["user-filter-button-wrapper"]}
              onClick={handlingOpenAddCateDialog}
            >
              <ArrowBackIosIcon />
              <span>Trở về quản lý danh mục</span>
            </Link>
          </div>

          <div className={Styles["user-search-add-container"]}>
            <div className={Styles["user-search-filter-container"]}>
              <div className={Styles["user-search-input-wrapper"]}>
                <SearchIcon />
                <input
                  style={{ backgroundColor: "white", color: "black" }}
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
            <div
              className={Styles["user-filter-button-wrapper"]}
              onClick={handlingOpenAddCateDialog}
            >
              <AddCircleOutlineOutlinedIcon />
              <span>Thêm danh mục con</span>
            </div>
          </div>
          <div className={Styles["markup-container"]}>
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
          <CateListDetail
            updateCateHeading={updateCateHeading}
            updateMax={updateMax}
            limit={quantity}
            page={page}
            updateCate={updateCate}
            handleOpenDialog={handlingOpenEditCateDialog}
            handleCloseDialog={handlingOpenEditCateDialog}
            handleOpenDetailDialog={handlingOpenDetailCate}
            updateId={updateId}
            token={cookies["token"]}
          />
          <AddCateDialogDetail
            mutating={mutate}
            id={query}
            token={cookies["token"]}
            isOpen={isOpenAddCateDialog}
            handleClose={handlingCloseAddCateDialog}
            imgSrc={avatarSrc}
            handleOpenImgDialog={handlingOpenEditImgDialog}
            cateHeading={cateHeading}
          />
          <EditCateDialogDetail
            mutating={mutate}
            cateHeading={cateHeading}
            token={cookies["token"]}
            cate={cate}
            updateCate={updateCate}
            isOpen={isOpenEditCateDialog}
            handleClose={handlingCloseEditCateDialog}
            imgSrc={avatarSrc}
            handleOpenImgDialog={handlingOpenEditImgDialog}
          />
          <EditImageDialog
            cateParent={cateHeading}
            isOpen={isOpenEditImgDialog}
            onClose={handlingCloseEditImgDialog}
            onChange={setAvatarSrc}
          />
          <Dialog
            fullWidth={true}
            maxWidth="md"
            open={isOpenDetailCateDialog}
            onClose={handlingCloseDetailCate}
          >
            <DialogContent>
              <CateDetailDialog id={id} />
            </DialogContent>
          </Dialog>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {page && (
              <Pagination onChange={handlePaging} count={max} size="large" />
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Index;
