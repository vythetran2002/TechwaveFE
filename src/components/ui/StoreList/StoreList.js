import React from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets/images";
import Fancybox from "@/components/utils/FancyBox";

function StoreList(props) {
  return (
    <>
      <Fancybox
        options={{
          Carousel: {
            infinite: true,
          },
        }}
      >
        <section className={Styles["store-list-container"]}>
          <div className={Styles["store-list-wrapper"]}>
            <div className={Styles["store-img-wrapper"]}>
              <Link
                data-fancybox="gallery"
                href={"https://i.imgur.com/DpbqsbL.png"}
                ref={props.imgRef}
              >
                <Image src={images.image12} alt="" className={Styles["img"]} />
              </Link>
            </div>
            <div className={Styles["store-img-wrapper"]}>
              <Link
                data-fancybox="gallery"
                href={"https://i.imgur.com/3xlrVl7.png"}
              >
                <Image src={images.image13} alt="" className={Styles["img"]} />
              </Link>
            </div>
            <div className={Styles["store-img-wrapper"]}>
              <Link
                data-fancybox="gallery"
                href={"https://i.imgur.com/DvxHAjE.png"}
              >
                <Image src={images.image14} alt="" className={Styles["img"]} />
              </Link>
            </div>
            <div className={Styles["store-img-wrapper"]}>
              <Link
                data-fancybox="gallery"
                href={"https://i.imgur.com/B47oO0Z.png"}
              >
                <Image src={images.image15} alt="" className={Styles["img"]} />
              </Link>
            </div>
            <div className={Styles["store-img-wrapper"]}>
              <Link
                data-fancybox="gallery"
                href={"https://i.imgur.com/TR6tO9d.png"}
              >
                <Image src={images.image16} alt="" className={Styles["img"]} />
              </Link>
            </div>
          </div>
        </section>
      </Fancybox>
    </>
  );
}

export default StoreList;
