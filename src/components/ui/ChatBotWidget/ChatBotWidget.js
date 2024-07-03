import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { TextArea } = Input;
import ReactDOM from "react-dom";
import { sendMessageToCoze } from "@/api/Coze/sendMessageToCoze";
import { sendMessageToAzure } from "@/api/Azure/sendMessageToAzure";
import ScrollOnTopWidget from "../ScrollOnTopWidget/ScrollOnTopWidget";

import images from "@/assets/images";

const InComingChat = (props) => {
  const { avatar, message, messages, updateContent } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // const handleMessageSending = async () => {
    //   try {
    //     setIsLoading(true);
    //     setIsError(false);
    //     const result = await sendMessageToAzure(message, messages);
    //     updateContent(result);
    //     setData(result);
    //   } catch (error) {
    //     setIsError(true);
    //     updateContent(error);
    //     setData(null);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // handleMessageSending();
    sendMessageToCoze(message)
      .then((data) => {
        setIsLoading(false);
        setIsError(false);
        updateContent(data.messages[1].content);
        // console.log(data);
        setData(data.messages[1].content);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        updateContent(message);
        setData(null);
      });
  }, []);

  if (isLoading) {
    return (
      <li className={Styles["chat-incoming"]}>
        <div className={Styles["avatar-wrapper"]}>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
            }
            alt=""
            className={Styles.avatar}
          />
        </div>
        <div className={Styles["incoming-text"]}>
          <div className={Styles["loader"]}>
            <li className={Styles["ball"]}></li>
            <li className={Styles["ball"]}></li>
            <li className={Styles["ball"]}></li>
          </div>
        </div>
      </li>
    );
  } else if (isError) {
    return (
      <li className={Styles["chat-incoming"]}>
        <div className={Styles["avatar-wrapper"]}>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
            }
            alt=""
            className={Styles.avatar}
          />
        </div>
        <p className={Styles["incoming-text"]}>Something's wrong ...</p>
      </li>
    );
  } else
    return (
      <li className={Styles["chat-incoming"]}>
        <div className={Styles["avatar-wrapper"]}>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
            }
            alt=""
            className={Styles.avatar}
          />
        </div>
        <p className={Styles["incoming-text"]}>{data}</p>
      </li>
    );
};
const OutgoingChat = (props) => {
  const { avatar, message } = props;

  return (
    <li className={Styles["chat-outgoing"]}>
      <div className={Styles["avatar-wrapper"]}>
        <img src={avatar} alt="" className={Styles.avatar} />
      </div>
      <p className={Styles["outgoing-text"]}>{message}</p>
    </li>
  );
};

const avatarSrc =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2M_ic4B2hXod3eQgo54NjQjE-A4ipn4JmA&s";

function ChatBotWidget(props) {
  const { scrollVisible, scrollToTop } = props;
  const [child, setChild] = useState([
    {
      role: "system",
      content: "You must answer all question in vietnamese",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState("");

  const chatToggler = useRef(null);
  const openIcon = useRef(null);
  const closeIcon = useRef(null);
  const chatBoxContainer = useRef(null);
  const chatBodyRef = useRef(null);

  const handleClickToggler = () => {
    setIsOpen(!isOpen);
  };

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const onClickSend = () => {
    let newChatArray = child;
    newChatArray.push(
      { role: "user", content: text },
      { role: "assistant", content: text }
    );
    setChild(newChatArray);
    // onResponse(text);
    // handlePushOutgoingChat(text);
    setData(text);
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickSend();
    }
  };

  const handlePressEnter = (event) => {
    event.preventDefault();
  };

  const updateLastElementContent = (data) => {
    let newChatArray = child;
    newChatArray[newChatArray.length - 1].content = data;
    setChild(newChatArray);
  };

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    // console.log("currentChild", child);
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    if (isOpen) {
      chatToggler.current.classList.add(Styles["show-chatbox"]);
      openIcon.current.style.display = "none";
      closeIcon.current.style.display = "block";
      chatBoxContainer.current.classList.add(Styles["show-chatBox"]);
    } else {
      chatToggler.current.classList.remove(Styles["show-chatbox"]);
      openIcon.current.style.display = "block";
      closeIcon.current.style.display = "none";
      chatBoxContainer.current.classList.remove(Styles["show-chatBox"]);
    }
  }, [isOpen, child, data]);

  return (
    <>
      <div className={Styles["widgets-container"]}>
        {scrollVisible && (
          <div
            onClick={() => {
              scrollToTop();
            }}
          >
            <ScrollOnTopWidget />
          </div>
        )}
        <button
          className={Styles["chatbot-toggler"]}
          ref={chatToggler}
          onClick={handleClickToggler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={Styles["chat-icon"]}
            ref={openIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <CloseOutlined ref={closeIcon} className={Styles["close-icon"]} />
        </button>
      </div>

      <div className={Styles["chatbot-container"]} ref={chatBoxContainer}>
        <header className={Styles["header-container"]}>
          <h2 className={Styles["header-title"]}>TECHWAVE CHATBOT</h2>
          <span className={Styles["header-close-btn"]}>
            <CloseOutlined
              className={Styles["header-close-icon"]}
              onClick={handleClickToggler}
            />
          </span>
        </header>
        <ul className={Styles["chat-body-container"]} ref={chatBodyRef}>
          {/* <li className={Styles["chat-incoming"]}>
            <div className={Styles["avatar-wrapper"]}>
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
                }
                alt=""
                className={Styles.avatar}
              />
            </div>
            <p className={Styles["incoming-text"]}>
              Hi there 👋How can I help you today?
            </p>
          </li> */}
          {/* {outgoingChat &&
            outgoingChat.map((chat, index) => {
              return (
                <React.Fragment key={"outgoingChat" + index}>
                  <OutgoingChat />
                </React.Fragment>
              );
            })} */}
          {child.length != 0 ? (
            child.map((data, index) => {
              if (data.role == "user")
                return (
                  <React.Fragment key={index}>
                    <OutgoingChat
                      avatar={avatarSrc}
                      message={data.content}
                      messages={child}
                    />
                  </React.Fragment>
                );
              else if (data.role == "assistant")
                return (
                  <React.Fragment key={index}>
                    <InComingChat
                      updateContent={updateLastElementContent}
                      avatar={avatarSrc}
                      message={data.content}
                      messages={child}
                    />
                  </React.Fragment>
                );
            })
          ) : (
            <div className={Styles["chat-box-placeholder-container"]}>
              <div className={Styles["image-placeholder-wrapper"]}>
                <img
                  className={Styles["placeholder"]}
                  src={images.techwave.src}
                />
              </div>
              <span className={Styles["placeholder-text"]}>
                TECHWAVE XIN CHÀO
              </span>
            </div>
          )}
        </ul>
        <div className={Styles["chat-input-container"]}>
          <TextArea
            value={text}
            className={Styles["chat-input"]}
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            onPressEnter={handlePressEnter}
            placeholder="Enter a message..."
          />
          {text != "" && (
            <div className={Styles["send-icon-wrapper"]}>
              <SendOutlined
                className={Styles["send-icon"]}
                onClick={onClickSend}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBotWidget;
