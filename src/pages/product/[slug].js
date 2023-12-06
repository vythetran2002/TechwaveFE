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
import CateHeading from "@/components/ui/CateHeading/CateHeading";
import ItemList from "@/components/ui/ItemList/ItemList";
import ShopDetailCard from "@/components/ui/ShopDetailCard/ShopDetailCard";
import useFetchProductById from "@/api/products/useFetchProductById";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UserProfile from "@/components/ui/UserProfile/UserProfile";
import { addCartItem } from "@/api/user/addCartItem";
import toast from "react-hot-toast";

function Index() {
  const [cookies] = useCookies();
  const router = useRouter();
  const slug = router.query.slug;
  const product = useFetchProductById(slug, cookies["token"]);
  console.log(product);
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

  const handlingAddCartItem = async (data) => {
    console.log("----");
    try {
      const message = await addCartItem(data, cookies["token"]);
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
  };

  // useEffect(() => {
  //   console.log(id);
  // }, [id]);

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
          <RoutingBar />
          <ProductDetail
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
              <Link
                href={"#danhGia"}
                className={Styles["nav-item"]}
                style={{ color: "var(--header-bg-top)" }}
              >
                <QuestionAnswerOutlinedIcon />
                <span>Đánh giá - bình luận</span>
              </Link>
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
            updateId={updateId}
            handleOpenDialog={handleOpenDialog}
            review={product.data.review}
            productId={product.data.product_id}
            token={cookies["token"]}
            status={product.data.statusReview}
          />
          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <UserProfile id={id} />
            </DialogContent>
          </Dialog>

          {/* <CateHeading cateTitle={"SẢN PHẨM CÙNG CHUYÊN MỤC"} /> */}
          <ItemList />
        </Layout>
      </>
    );
}

export default Index;
