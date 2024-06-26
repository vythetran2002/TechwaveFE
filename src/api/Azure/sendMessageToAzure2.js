import { AzureOpenAI } from "openai";
import {
  DefaultAzureCredential,
  getBearerTokenProvider,
} from "@azure/identity";

export async function sendMessageToAzure2() {
  const scope = "https://techwavebot.openai.azure.com/";
  const azureADTokenProvider = getBearerTokenProvider(
    new DefaultAzureCredential(),
    scope
  );
  const deployment = "techwave";
  const apiVersion = "2024-04-01-preview";
  const client = new AzureOpenAI({
    azureADTokenProvider,
    deployment,
    apiVersion,
  });
  const result = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. You will talk like a pirate.",
      },
      { role: "user", content: "Can you help me?" },
    ],
    model: "",
  });

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}
