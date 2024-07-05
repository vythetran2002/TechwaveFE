import React from "react";
import Styles from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

function RoutingBar(props) {
  const { product } = props;
  console.log(product);

  if (product)
    return (
      <>
        <div className={Styles["routing-bar-container"]}>
          <div className={Styles["routing-bar-wrapper"]}>
            <Link href={"/"} className={Styles["link"]}>
              <HomeIcon />
            </Link>
            /
            {/* <Link className={Styles["link"]} href="/">
            Sản phẩm{" "}
          </Link>{" "}
          / */}
            {product.category.parent ? (
              <>
                <Link
                  className={Styles["link"]}
                  href={"/cate/" + product.category.parent.category_id}
                >
                  {product.category.parent.name}
                </Link>
                /
                {product.category.current && (
                  <>
                    <Link
                      className={Styles["link"]}
                      href={
                        "/cate/" +
                        product.category.parent.category_id +
                        "/" +
                        product.category.current.category_id
                      }
                    >
                      {product.category.current.name}
                    </Link>
                    /
                  </>
                )}
              </>
            ) : (
              <>
                <Link className={Styles["link"]} href="/">
                  {product.category.name} /
                </Link>
              </>
            )}
            <span> {product.name}</span>
          </div>
        </div>
      </>
    );
}

export default RoutingBar;
