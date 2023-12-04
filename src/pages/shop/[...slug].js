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
import { useCookies } from "react-cookie";

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function ShopIndex() {
  const router = useRouter();
  const [cookies] = useCookies();
  const [count, setCount] = useState(0);
  const [favouriteChanged, setFavouriteChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailItem, setDeTailItem] = useState(null);
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
  // console.log(store);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handlingAddFavouriteProduct = async (id) => {
    try {
      const message = await addFollowVendor(id, cookies["token"]);
      console.log(message);
      toast.success("Followed");
      window.location.reload();
    } catch (error) {
      toast.error("error");
    }
  };

  const handlingRemoveFavouriteProduct = async (id) => {
    try {
      const message = await RemoveFollowVendor(id, cookies["token"]);
      console.log(message);
      window.location.reload();
    } catch (error) {
      toast.error("error");
    }
  };

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  // useState(() => {
  //   console.log("aaa");
  // }, [count, store]);

  if (store.isLoading) {
    return <>Loading</>;
  }

  if (store.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>{store.data.info.info.username}</title>
        </Head>
        <Layout>
          <Toaster />

          <ShopPageInfo
            handleOpenDialog={handleOpenDialog}
            count={count}
            store={store.data}
            addFavourite={handlingAddFavouriteProduct}
            removeFollow={handlingRemoveFavouriteProduct}
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
                <div className={Styles["filter-item-list-container"]}>
                  {store.data ? (
                    store.data.data &&
                    store.data.data[id1] &&
                    store.data.data[id1].product.map((product, index) => {
                      console.log(product);
                      return (
                        <React.Fragment key={"productItem" + index}>
                          <Item
                            item={product}
                            setDeTailItem={setDeTailItem}
                            handlingOpenDialog={handlingOpenDialog}
                          />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <>Loading</>
                  )}
                  {/* <Item />
                <Item />
                <Item /> */}
                  {/* <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                {/* <Item />  */}
                </div>
                <div className={Styles["pagination-container"]}>
                  <Pagination size="large" count={10} shape="rounded" />
                </div>
              </div>
            </div>
          </div>
          <ItemDetail
            item={detailItem}
            isOpenDialog={isOpenDialog}
            handlingOpenDialog={handlingOpenDialog}
            handlingCloseDialog={handlingCloseDialog}
          />
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <ReportForm id={id0} token={cookies["token"]} />
            </DialogContent>
          </Dialog>
        </Layout>
      </>
    );
}

export default ShopIndex;
