import React from "react";

function CustomLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div class="custom-loader"></div>
    </div>
  );
}

export default CustomLoader;
