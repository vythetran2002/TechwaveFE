const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// You will need to set these environment variables or edit the following values
// The endpoint you will use to access your Azure OpenAI instance
const endpoint = "https://techwavebot.openai.azure.com/";
// Your Azure OpenAI API key
const azureApiKey = "55fe49d8fa544a0da548389af3760134";
// Your Azure Cognitive Search endpoint, admin key, and index name
const azureSearchEndpoint = "https://teachwavesearchservice.search.windows.net";
const azureSearchAdminKey =
  "UYPqVZdk249qdurkcdQL87bb8PdGBF8oep9cIBu6WSAzSeAwC55Q";
const azureSearchIndexName = "dataindex-index";
const deploymentId = "techwave";

export async function sendMessageToAzure(message, messages) {
  if (message !== "") {
    const response = [];
    // const client = new OpenAIClient(ENDPOINT, new InteractiveBrowserCredential());

    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    const events = await client.streamChatCompletions(deploymentId, messages, {
      maxTokens: 128,
      /**
       * The `azureExtensionOptions` property is used to configure the
       * Azure-specific extensions. In this case, we are using the
       * Azure Cognitive Search extension with a vector index to provide
       * the model with additional context.
       */
      azureExtensionOptions: {
        extensions: [
          {
            type: "azure_search",
            endpoint: azureSearchEndpoint,
            indexName: azureSearchIndexName,
            authentication: {
              type: "api_key",
              key: azureSearchAdminKey,
            },
          },
        ],
      },
    });

    for await (const event of events) {
      for (const choice of event.choices) {
        const delta = choice.delta?.content;
        if (delta !== undefined) {
          response.push(delta);
        }
      }
    }

    const sentence = response.join("");
    console.log(sentence);
    return sentence;
  } else {
    return null;
  }
}
