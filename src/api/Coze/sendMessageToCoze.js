import axios from "axios";

const URL = "https://api.coze.com/open_api/v2/chat";
const API_KEY =
  "pat_nuA2V4Pt8xJSmNn2lAzK1bivk7QSJenAumMo9kQSIIB3gg8pNGCPy40EyJKaQhIR";
const BOT_ID = "7390017177010765831";

export const sendMessageToCoze = async (messsage) => {
  try {
    const response = await axios.post(
      URL,
      {
        conversation_id: "123",
        bot_id: BOT_ID,
        user: "123333333",
        query: messsage,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
