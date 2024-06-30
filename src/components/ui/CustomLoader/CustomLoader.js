import React from "react";

function CustomLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "30px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="custom-loader"></div>
    </div>
  );
}

export default CustomLoader;
