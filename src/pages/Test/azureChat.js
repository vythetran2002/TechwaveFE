import { sendMessageToAzure2 } from "@/api/Azure/sendMessageToAzure2";
import React from "react";
import { sendMessageToAzure } from "@/api/Azure/sendMessageToAzure";

const message = [
  {
    role: "system",
    content: "YOU MUST ANSWER IN VIETNAMESE!",
  },
  {
    role: "user",
    content: "Kevin là ai?",
  },
];

function azureChat() {
  const handleClick = async () => {
    const result = await sendMessageToAzure("HELO", message);
    console.log(result);
  };

  return (
    <div className="bg-black">
      <button onClick={handleClick}>Click ME!</button>
    </div>
  );
}

export default azureChat;
