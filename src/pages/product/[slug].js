import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import RoutingBar from "@/components/ui/RoutingBar/RoutingBar";
import ProductDetail from "@/components/ui/ProductDetail/ProductDetail";
import Styles from "./styles.module.css";
import Link from "next/link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import Blog from "@/components/ui/Blog/Blog";
import CommentForm from "@/components/ui/CommentForm/CommentForm";
import ItemList from "@/components/ui/ItemList/ItemList";
import ShopDetailCard from "@/components/ui/ShopDetailCard/ShopDetailCard";
import useFetchProductById from "@/api/products/useFetchProductById";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UserProfile from "@/components/ui/UserProfile/UserProfile";
import { addCartItem } from "@/api/user/addCartItem";
import toast from "react-hot-toast";
import { Element, scroller } from "react-scroll";
import Cookies from "js-cookie";
import useFetchCart from "@/api/user/useFetchCart";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import useFetchShopById from "@/api/shop/useFetchShopByPage";

function Index() {
  const token = Cookies.get("token");
  const router = useRouter();
  const slug = router.query.slug;
  const [img, setImg] = useState(null);
  const [reload, setReload] = useState(false);
  const { mutate } = useFetchCart();

  // console.log(slug);
  const product = useFetchProductById(slug, token);

  // const shop = useFetchShopById(slug);
  // console.log(shop);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const updateId = (value) => {
    setId(value);
  };

  const updateImg = (value) => {
    setImg(value);
    setReload(!reload);
  };

  const handlingAddCartItem = async (data) => {
    // console.log("----");

    if (data.stock > 0) {
      try {
        const message = await addCartItem(data, token);
        await mutate();
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
      toast.error("Xin lỗi, mặt hàng này hiện tại đã hết");
    }
  };

  function scrollToElement(element) {
    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.pageYOffset,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (router.query.nav) {
      scroller.scrollTo("danhGia", {
        smooth: true,
        duration: 500,
        offset: -50,
      });
    }
    setReload(!reload);
  }, [router.query.nav, product.data]);

  if (product.isLoading) {
    return <>Loading</>;
  }

  if (product.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          {product.data ? (
            <title>{product.data.name}</title>
          ) : (
            <title>Techwave - Product</title>
          )}
        </Head>
        <Layout>
          <Toaster />
          <RoutingBar product={product.data} />
          <ProductDetail
            img={img}
            updateImg={updateImg}
            handleAddCart={handlingAddCartItem}
            product={product.data}
          />
          <ShopDetailCard product={product.data} />
          <div className={Styles["nav-container"]}>
            <div className={Styles["nav-wrapper"]}>
              <div
                className={Styles["nav-item"]}
                style={{ backgroundColor: "var(--header-bg-top)" }}
              >
                <InfoOutlinedIcon />
                <span>Thông tin chi tiết</span>
              </div>
              <span
                className={Styles["nav-item"]}
                style={{
                  color: "var(--header-bg-top)",
                  scrollBehavior: "smooth",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  const targetElement = document.getElementById("danhGia");
                  scrollToElement(targetElement);
                }}
              >
                <QuestionAnswerOutlinedIcon />
                <span>Đánh giá - bình luận</span>
              </span>
            </div>
          </div>
          <Blog content={product.data.content} />
          <div id="comment" className={Styles["nav-container"]}>
            <div className={Styles["nav-wrapper"]}>
              <span
                href={"/"}
                className={Styles["nav-item"]}
                style={{ backgroundColor: "var(--header-bg-top)" }}
                id="danhGia"
              >
                <span>Đánh giá SP</span>
              </span>
            </div>
          </div>
          <CommentForm
            name={"danhGia"}
            updateId={updateId}
            handleOpenDialog={handleOpenDialog}
            review={product.data.review}
            productId={product.data.product_id}
            token={token}
            status={product.data.statusReview}
          />
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <UserProfile
                token={token}
                handleCloseDialog={handleCloseDialog}
                id={id}
              />
            </DialogContent>
          </Dialog>

          {/* <CateHeading cateTitle={"SẢN PHẨM CÙNG CHUYÊN MỤC"} /> */}
          <ItemList />
        </Layout>
      </>
    );
}

export default Index;
