import React, { useState } from "react";
import Head from "next/head";
import UserLayout from "@/components/layout/UserLayout";
import Styles from "../favourites/style.module.css";
import { useRef } from "react";
import ReportItemCard from "@/components/ui/ReportItemCard/ReportItemCard";
import useFetchAllReport from "@/api/user/useFetchAllReport";
import useFetchUserProfile from "@/api/user/useFetchUserProfile";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportDetailUser from "@/components/ui/ReportDetailUser/ReportDetailUser";
import FullScreenLoader from "@/components/ui/FullScreenLoader/FullScreenLoader";

function Index() {
  const reports = useFetchAllReport();
  const user = useFetchUserProfile();
  const [rpId, setRpId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  //Refs
  const passwdRef = useRef();
  const iconRef = useRef();
  const orderingItem = useRef();
  const orderedItem = useRef();
  const itemRef = useRef();
  const pendingItem = useRef();
  const cancledItem = useRef();

  const handlingClickQLDH = () => {
    iconRef.current.classList.toggle("rt-180");
    itemRef.current.classList.toggle("show");
    orderedItem.current.classList.toggle("appear");
    orderingItem.current.classList.toggle("appear");
    pendingItem.current.classList.toggle("appear");
    cancledItem.current.classList.toggle("appear");
  };

  const updateId = (value) => {
    setRpId(value);
  };

  if (reports.isLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <UserLayout user={user} path={"/reports"}>
          <FullScreenLoader />
        </UserLayout>
      </>
    );
  }
  if (reports.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Báo cáo của tôi</title>
        </Head>
        <UserLayout user={user} path={"/reports"}>
          <div className={Styles["profile-right-edit-form-wrapper"]}>
            <div className={Styles["profile-title-container"]}>
              <span style={{ fontWeight: "400", fontSize: "20px" }}>
                Báo cáo của tôi
              </span>
              <span>Quản lý danh sách báo cáo</span>
            </div>
            <div className={Styles["product-purchase-item-container"]}>
              <div>
                {/* 0 : processing
                    1 : proccessed */}
                {reports.data ? (
                  reports.data ? (
                    reports.data.map((reportItem, index) => {
                      return (
                        <React.Fragment key={"reportItem" + index}>
                          <ReportItemCard
                            updateId={updateId}
                            id={reportItem.report_id}
                            handleOpenDialog={handleOpenDialog}
                            status={reportItem.status}
                            date={reportItem.createAt}
                            avatar={reportItem.account_report.avatar}
                            name={reportItem.account_report.username}
                          />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <>Empty</>
                  )
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
          </div>

          <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={handleCloseDialog}
          >
            <DialogContent>
              <ReportDetailUser id={rpId} />
            </DialogContent>
          </Dialog>
        </UserLayout>
      </>
    );
}

export default Index;
