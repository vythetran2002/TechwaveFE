import React, { useState, createContext, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Slider from "@/components/ui/Slider/Slider";
import ServiceList from "@/components/ui/ServiceList/ServiceList";
import CateHeading from "@/components/ui/CateHeading/CateHeading";
import ItemList from "@/components/ui/ItemList/ItemList";
import AdBar from "@/components/ui/AdBar/AdBar";
import images from "@/assets/images";
import StoreImageHeading from "@/components/ui/StoreImageHeading/StoreImageHeading";
import StoreList from "@/components/ui/StoreList/StoreList";
import CustomerFeedBack from "@/components/ui/CustomerFeedBack/CustomerFeedBack";
import Map from "@/components/ui/Map/Map";
import { Anchor } from "antd";
import CategoryList from "@/components/ui/CategoryList/CategoryList";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import toast, { Toaster } from "react-hot-toast";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import { addCartItem } from "@/api/user/addCartItem";
import { useRouter } from "next/router";
import useFetchProductByCateId from "@/api/products/useFetchProductByCateId";
import useFetchCart from "@/api/user/useFetchCart";
import Cookies from "js-cookie";
import ChatBotWidget from "@/components/ui/ChatBotWidget/ChatBotWidget";
import UserLoadingUI from "@/components/ui/UserLoadingUI/UserLoadingUI";
import UserErrorUI from "@/components/ui/UserErrorUI/UserErrorUI";
import ScrollOnTopWidget from "@/components/ui/ScrollOnTopWidget/ScrollOnTopWidget";

function Index() {
  const token = Cookies.get("token");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailItem, setDeTailItem] = useState(null);
  const { mutate } = useFetchCart();
  const cateList01 = useFetchProductByCateId(2);
  // console.log(cateList01);
  const cateList02 = useFetchProductByCateId(16);
  const cateList03 = useFetchProductByCateId(4);
  const route = useRouter();

  //Refs
  const trendingRef = useRef(null);

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const mutateCateList01 = () => {
    cateList01.mutate();
  };
  const mutateCateList02 = () => {
    cateList02.mutate();
  };

  const mutateCateList03 = () => {
    cateList03.mutate();
  };

  const handlingAddFavouriteProduct = async (id) => {
    const message = await addFavouriteProduct(id, token);
  };

  const handlingAddCartItem = async (data) => {
    try {
      const message = await addCartItem(data, token);
      await mutate();
      // console.log(data);
      if (message) {
        toast.success("Đã thêm vào giỏ");
      } else {
        toast.error("Cần đăng nhập");
        route.push("/auth/login");
      }
    } catch (error) {
      toast.error("Cần đăng nhập");
      route.push("/auth/login");
    }
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    console.log("first");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleScrollToTrending = () => {
    // trendingRef.current.scrollIntoView({ behavior: "smooth" });
    if (trendingRef.current) {
      const yOffset = -100; // Số pixel muốn scroll lên. Điều chỉnh giá trị này theo ý muốn.
      const element = trendingRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // console.log(trendingRef.current);
  };

  return (
    <>
      <Head>
        <title>Techwave</title>
      </Head>
      <Layout handleScrollToTrending={handleScrollToTrending}>
        <Toaster />
        <CategoryList />
        <Slider />
        <ServiceList />

        {cateList01.isLoading ? (
          <>
            <UserLoadingUI />
          </>
        ) : (
          <>
            {cateList01.isError ? (
              <>
                <UserErrorUI />
              </>
            ) : (
              <>
                <CateHeading
                  trendingRef={trendingRef}
                  trendingTitle={"SẢN PHẨM BÁN CHẠY"}
                  loading={cateList01.isLoading}
                  error={cateList01.isError}
                />

                <ItemList
                  mutate={mutateCateList01}
                  token={token}
                  items={cateList01.data}
                  loading={cateList01.isLoading}
                  error={cateList01.isError}
                  isOpenDialog={isOpenDialog}
                  handlingOpenDialog={handlingOpenDialog}
                  handlingCloseDialog={handlingCloseDialog}
                  setDeTailItem={setDeTailItem}
                  itemKey="list01"
                  addFavourite={handlingAddFavouriteProduct}
                  addCartItem={handlingAddCartItem}
                />
              </>
            )}
          </>
        )}
        {cateList01.isLoading ? (
          <>
            <UserLoadingUI />
          </>
        ) : (
          <>
            {cateList01.isError ? (
              <>
                <UserErrorUI />
              </>
            ) : (
              <>
                <CateHeading
                  cateTitle={cateList01.data}
                  loading={cateList01.isLoading}
                  error={cateList01.isError}
                />

                <ItemList
                  mutate={mutateCateList01}
                  token={token}
                  items={cateList01.data}
                  loading={cateList01.isLoading}
                  error={cateList01.isError}
                  isOpenDialog={isOpenDialog}
                  handlingOpenDialog={handlingOpenDialog}
                  handlingCloseDialog={handlingCloseDialog}
                  setDeTailItem={setDeTailItem}
                  itemKey="list01"
                  addFavourite={handlingAddFavouriteProduct}
                  addCartItem={handlingAddCartItem}
                />
              </>
            )}
          </>
        )}
        <AdBar src={images.image9} />
        {cateList02.isLoading ? (
          <>
            <UserLoadingUI />
          </>
        ) : (
          <>
            {cateList02.isError ? (
              <>
                <UserErrorUI />
              </>
            ) : (
              <>
                <CateHeading
                  cateTitle={cateList02.data}
                  loading={cateList02.isLoading}
                  error={cateList02.isError}
                />
                <ItemList
                  mutate={mutateCateList02}
                  token={token}
                  items={cateList02.data}
                  loading={cateList02.isLoading}
                  error={cateList02.isError}
                  isOpenDialog={isOpenDialog}
                  setDeTailItem={setDeTailItem}
                  handlingOpenDialog={handlingOpenDialog}
                  handlingCloseDialog={handlingCloseDialog}
                  itemKey="list02"
                  addFavourite={handlingAddFavouriteProduct}
                  addCartItem={handlingAddCartItem}
                />
              </>
            )}
          </>
        )}

        <AdBar src={images.image11} />
        {cateList03.isLoading ? (
          <>
            <UserLoadingUI />
          </>
        ) : (
          <>
            {cateList03.isError ? (
              <>
                <UserErrorUI />
              </>
            ) : (
              <>
                <CateHeading
                  cateTitle={cateList03.data}
                  loading={cateList03.isLoading}
                  error={cateList03.isError}
                />

                <ItemList
                  mutate={mutateCateList03}
                  token={token}
                  items={cateList03.data}
                  loading={cateList03.isLoading}
                  error={cateList03.isError}
                  isOpenDialog={isOpenDialog}
                  setDeTailItem={setDeTailItem}
                  handlingOpenDialog={handlingOpenDialog}
                  handlingCloseDialog={handlingCloseDialog}
                  itemKey="list03"
                  addFavourite={handlingAddFavouriteProduct}
                  addCartItem={handlingAddCartItem}
                />
              </>
            )}
          </>
        )}
        <StoreImageHeading title="HÌNH ẢNH CỬA HÀNG" />
        <StoreList />
        <StoreImageHeading title="KHÁCH HÀNG NÓI GÌ?" />
        <CustomerFeedBack />
        <Map />
        <ItemDetail
          // updateImg={setImg}
          addCartItem={handlingAddCartItem}
          item={detailItem}
          isOpenDialog={isOpenDialog}
          handlingOpenDialog={handlingOpenDialog}
          handlingCloseDialog={handlingCloseDialog}
        />
        <ChatBotWidget scrollVisible={isVisible} scrollToTop={scrollToTop} />
      </Layout>
    </>
  );
}

export default Index;
