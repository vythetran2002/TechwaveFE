import React from "react";
import { Button, Modal } from "antd";

function PaymentPopup() {
  return (
    <div>
      <Modal
        open={openPopup}
        title="Oops"
        onOk={handleOkPopup}
        width={750}
        onCancel={handleCancelPopup}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className={Styles["popup-footer"]}>
            <Button>Về trang chủ</Button>
            <Button type="primary" danger>
              Xoá sản phẩm ra khỏi giỏ hàng
            </Button>
            <Button type="primary">Chỉnh sửa số lượng sản phẩm phù hợp</Button>
          </div>
        )}
      >
        YEARP
      </Modal>
    </div>
  );
}

export default PaymentPopup;
