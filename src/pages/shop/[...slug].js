import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ShopPageInfo from "@/components/ui/ShopPageInfo/ShopPageInfo";
import ShopBio from "@/components/ui/ShopBio/ShopBio";
import Link from "next/link";
import Item from "@/components/ui/ItemList/Item/Item";
import { Pagination } from "@mui/material";
import useFetchShopById from "@/api/shop/useFetchShopById";
import { useRouter } from "next/router";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import toast, { Toaster } from "react-hot-toast";
import { addFollowVendor } from "@/api/user/addFollowVendor";
import { RemoveFollowVendor } from "@/api/user/removeFollowVendor";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportForm from "@/components/ui/ReportForm/ReportForm";
import ShopItemList from "@/components/ui/ShopItemList/ShopItemList";
import { addCartItem } from "@/api/user/addCartItem";
import useFetchCart from "@/api/user/useFetchCart";
import Cookies from "js-cookie";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import CozeChat from "@/components/ui/CozeChat/CozeChat";
import FullScreenLoader from "@/components/ui/FullScreenLoader/FullScreenLoader";

function ShopIndex() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);
  const [favouriteChanged, setFavouriteChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailItem, setDeTailItem] = useState(null);
  const [quantity, setQuantity] = useState(5);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(2);
  const { mutate } = useFetchCart();
  const slug = router.query.slug;
  let id0 = null;
  let id1 = null;
  // Đảm bảo rằng slug là một mảng và có ít nhất một phần tử
  if (Array.isArray(slug) && slug.length > 0) {
    id0 = slug[0];
    id1 = slug[1];
  }
  // console.log(id0);
  // console.log(id1);
  const store = useFetchShopById(id0);

  const updateImg = (value) => {
    setImg(value);
    setReload(!reload);
  };
  // console.log(store);
  // console.log(store);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handlingAddFavouriteProduct = async (id) => {
    const message = await addFavouriteProduct(id, token);
  };

  const handlingRemoveFavouriteVendor = async (id) => {
    try {
      const message = await RemoveFollowVendor(id, token);
    } catch (error) {
      console.log(error);
    }
  };

  const handlingAddFavouriteVendor = async (id) => {
    try {
      const message = await addFollowVendor(id, token);
      if (message) {
        toast.success("Đã theo dõi cửa hàng");
      } else {
        toast.error("Bạn cần đăng nhập trước");
      }
    } catch (error) {
      toast.error("Bạn cần đăng nhập trước");
    }
  };

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
    setImg(null);
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

  const handlingAddCartItem = async (data, stock) => {
    // console.log(data);
    if (stock > 0) {
      try {
        const message = await addCartItem(data, token);
        await mutate();
        // console.log(data);
        if (message) {
          toast.success("Đã thêm vào giỏ");
        } else {
          toast.error("Cần đăng nhập");
          router.push("/auth/login");
        }
      } catch (error) {
        toast.error("Cần đăng nhập");
        router.push("/auth/login");
      }
    } else {
      toast.error("Xin lỗi, mặt hàng hiện tại đã hết");
    }
  };

  // useState(() => {
  //   console.log("aaa");
  // }, [count, store]);
  useEffect(() => {
    setReload(!reload);
  }, [img]);

  if (store.isLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <Layout>
          <FullScreenLoader />
        </Layout>
      </>
    );
  }

  if (store.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>{store.data?.info.info.username}</title>
        </Head>
        <Layout>
          <Toaster />

          <ShopPageInfo
            handleOpenDialog={handleOpenDialog}
            count={count}
            store={store.data}
            removeFollow={handlingRemoveFavouriteVendor}
            mutate={store.mutate}
            addFavourite={handlingAddFavouriteVendor}
          />

          <ShopBio />
          <div className={Styles["filter-container"]}>
            <div className={Styles["filter-wrapper"]}>
              <div className={Styles["nav-container"]}>
                {store.data ? (
                  store.data.data &&
                  store.data.data.map((item, index) => {
                    if (index == id1) {
                      return (
                        <React.Fragment key={"cateItem" + index}>
                          <Link
                            href={"/shop/" + id0 + "/" + index}
                            className={`${Styles["nav-item"]} ${Styles["active"]}`}
                          >
                            {item.category.name}
                          </Link>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <React.Fragment key={"cateItem" + index}>
                          <Link
                            href={"/shop/" + id0 + "/" + index}
                            className={`${Styles["nav-item"]}`}
                          >
                            {item.category.name}
                          </Link>
                        </React.Fragment>
                      );
                    }
                  })
                ) : (
                  <>Loading...</>
                )}
                {/* <Link
                href={"/shop/1"}
                className={`${Styles["nav-item"]} ${Styles["active"]}`}
              >
                CHÂN VÁY NGẮN
              </Link>
              <Link href={"/shop/1"} className={Styles["nav-item"]}>
                QUẦN TÂY
              </Link> */}
              </div>
              <div className={Styles["filter-list-container"]}>
                <div className={Styles["filter-heading-container"]}>
                  <span>Sắp xếp theo</span>
                  <Link
                    href={""}
                    className={`${Styles["filter-button"]} ${Styles["active"]}`}
                  >
                    Phổ biến
                  </Link>
                  <Link href={""} className={`${Styles["filter-button"]} `}>
                    Mới nhất
                  </Link>
                  <Link href={""} className={`${Styles["filter-button"]} `}>
                    Bán chạy
                  </Link>
                </div>
                {/* {
                store.data ? store.data.
              } */}
                <ShopItemList
                  setDeTailItem={setDeTailItem}
                  page={page}
                  id={id0}
                  cateId={id1}
                  updateMax={updateMax}
                  handleOpenDialog={handlingOpenDialog}
                  handleCloseDialog={handlingCloseDialog}
                  handlingAddCartItem={handlingAddCartItem}
                  token={token}
                  addFavourite={handlingAddFavouriteProduct}
                />
                <div className={Styles["pagination-container"]}>
                  {page && (
                    <Pagination
                      onChange={handlePaging}
                      count={max}
                      size="large"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ItemDetail
            img={img}
            updateImg={updateImg}
            item={detailItem}
            isOpenDialog={isOpenDialog}
            handlingOpenDialog={handlingOpenDialog}
            handlingCloseDialog={handlingCloseDialog}
            addCartItem={handlingAddCartItem}
          />
          <CozeChat isVisible={true} />
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <ReportForm
                handlingCloseDialog={handlingCloseDialog}
                id={id0}
                token={token}
              />
            </DialogContent>
          </Dialog>
        </Layout>
      </>
    );
}

export default ShopIndex;
