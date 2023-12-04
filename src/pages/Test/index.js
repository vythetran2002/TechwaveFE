import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import Head from "next/head";
import Styles from "./test.module.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const ImageResize = dynamic(() => import("quill-image-resize-module-react"), {
//   ssr: false,
// });
// const quillImport = dynamic(
//   () => {
//     return import("react-quill").then(({ Quill }) => Quill);
//   },
//   { ssr: false }
// );

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const { SubMenu } = Menu;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function thayTheDauNhay(chuoi) {
  return chuoi.replace(/"/g, "'");
}

const Index = () => {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["link", "image"],

    // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize"],
    // },
    // ImageResize: {
    //   // You can pass image resize module options here
    //   parchment: Quill.import("parchment"),
    // },
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  const items = [
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  // Sử dụng component như dưới đây:

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const dropdownRef = useRef();

  const onClick = () => {
    dropdownRef.current.classList.toggle("show");
  };

  function HtmlContent({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  const htmlString = "<p>Hello, <strong>World</strong>!</p>";

  return (
    <>
      <Head>
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div style={{ padding: "30px" }}>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
        />
        <div style={{ marginTop: "50px" }}> </div>
        <div className="ql-editor">
          <HtmlContent htmlString={value} />
        </div>
      </div>
    </>
  );
};

export default Index;
