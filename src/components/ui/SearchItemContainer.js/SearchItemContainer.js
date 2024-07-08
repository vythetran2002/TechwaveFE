import React from "react";
import Styles from "./styles.module.css";
import useFetchSearchProduct from "@/api/useFetchSearchProduct";
import SearchItemCard from "../SearchItemCard/SearchItemCard";
import UserErrorUI from "../UserErrorUI/UserErrorUI";
import UserLoadingUI from "../UserLoadingUI/UserLoadingUI";
import { Empty, Typography } from "antd";

function SearchItemContainer(props) {
  const { searchContainerRef, value } = props;
  const result = useFetchSearchProduct(value);

  return (
    <div
      ref={searchContainerRef}
      className={Styles["search-suggestion-autocomplete-container"]}
    >
      {result.loading ? (
        <UserLoadingUI />
      ) : (
        <>
          {result.error ? (
            <UserErrorUI />
          ) : (
            <>
              {result.data && result.data.results.length != 0 ? (
                result.data.results.map((item, index) => {
                  return (
                    <React.Fragment key={"search-item" + index}>
                      <SearchItemCard item={item} />
                    </React.Fragment>
                  );
                })
              ) : (
                <div style={{ width: "100%", height: "100%", padding: "30px" }}>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={
                      <Typography.Text
                        style={{ opacity: "0.5", marginTop: "10px" }}
                      >
                        Not found
                      </Typography.Text>
                    }
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchItemContainer;
