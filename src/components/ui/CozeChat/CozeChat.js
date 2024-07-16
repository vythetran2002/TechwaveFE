import { useEffect, useState } from "react";

export function removeCozeScript() {
  // Xóa script
  const script = document.querySelector(
    'script[src^="https://sf-cdn.coze.com"]'
  );
  if (script) {
    script.remove();
  }

  // Xóa container của Coze Chat
  const cozeChatContainer = document.querySelector(".fda3723591e0b38e7e52");
  if (cozeChatContainer) {
    cozeChatContainer.remove();
  }

  // Xóa các phần tử khác mà Coze có thể đã thêm vào
  const cozeElements = document.querySelectorAll(
    '[class^="coze-"], [id^="coze-"]'
  );
  cozeElements.forEach((element) => element.remove());

  // Xóa các style elements mà Coze có thể đã thêm vào
  const cozeStyles = document.querySelectorAll("style[data-coze]");
  cozeStyles.forEach((style) => style.remove());

  // Nếu Coze đã thêm bất kỳ event listeners nào, bạn cũng nên xóa chúng
  // Tuy nhiên, điều này phụ thuộc vào cách Coze implement và có thể khó thực hiện

  // Reset state nếu cần
  if (typeof window.CozeWebSDK !== "undefined") {
    delete window.CozeWebSDK;
  }
}

export default function CozeChat({ isVisible = false }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const userLayoutElement = document.querySelector(".userLayout");

    if (userLayoutElement) {
      const script = document.createElement("script");
      script.src =
        "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.4/libs/oversea/index.js";
      script.async = true;
      script.onload = () => {
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: "7390017177010765831",
          },
          componentProps: {
            title: "Techwave",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKYAy8B0mg09L8pgYYsilTdS94FTTyAdbkIQ&s",
          },
        });
        setIsLoaded(true);
      };

      userLayoutElement.appendChild(script);

      return () => {
        removeCozeScript();
        setIsLoaded(false);
      };
    }
  }, [isVisible]);

  return isLoaded ? <div className="coze-chat-container"></div> : null;
}
