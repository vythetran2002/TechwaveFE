import { useEffect } from "react";

export default function CozeChat() {
  useEffect(() => {
    // Load script
    const script = document.createElement("script");
    script.src =
      "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.4/libs/oversea/index.js";
    script.async = true;
    script.onload = () => {
      // Initialize CozeWebSDK after the script has loaded
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: "7390017177010765831",
        },
        componentProps: {
          title: "Techwave",
        },
      });
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
}
