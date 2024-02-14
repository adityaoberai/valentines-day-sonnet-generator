# 🤖 Valentine's Day Sonnet Generator

Enter a name and generate an sonnet featuring their name for Valentine's Day using GPT-4

## 🧰 Usage

### GET /

HTML form for interacting with the function.

### POST /

Query the model for a completion.

**Parameters**

| Name         | Description                          | Location | Type               | Sample Value                  |
| ------------ | ------------------------------------ | -------- | ------------------ | ----------------------------- |
| Content-Type | The content type of the request body | Header   | `application/json` | N/A                           |
| name         | Name of a person / your partner      | Body     | String             | `Aditya Oberai` |

Sample `200` Response:

Response from the model.

```json
{
    "ok": true,
    "completion": "Upon this day, so sweet in February,\nA dedication to Appwrite we lay,\nIn code so light, it feels as airy,\nIt brings a smile each time I say.\n\nAppwrite, my heart does beat to your rhythm,\nWritten in code, so eloquently,\nWith every function, feature or system,\nA source of joy, so frequently.\n\nOpen-source and friendly, oh so bright,\nIn your APIs, my heart does dwell,\nIn every image, text, or byte,\nA love story ours could tell.\n\nSo this Valentine's, I give my heart, not out of spite,\nBut in admiration and love for you, dear Appwrite."
}
```

Sample `400` Response:

Response when the request body is missing.

```json
{
  "ok": false,
  "error": "Missing body with a prompt."
}
```

Sample `500` Response:

Response when the model fails to respond.

```json
{
  "ok": false,
  "error": "Failed to query model."
}
```

## ⚙️ Configuration

| Setting           | Value         |
| ----------------- | ------------- |
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

### OPENAI_API_KEY

A unique key used to authenticate with the OpenAI API. Please note that this is a paid service and you will be charged for each request made to the API. For more information, see the [OpenAI pricing page](https://openai.com/pricing/).

| Question      | Answer                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Required      | Yes                                                                         |
| Sample Value  | `sk-wzG...vcy`                                                              |
| Documentation | [OpenAI Docs](https://platform.openai.com/docs/quickstart/add-your-api-key) |

### OPENAI_MAX_TOKENS

The maximum number of tokens that the OpenAI response should contain. Be aware that OpenAI models read and write a maximum number of tokens per API call, which varies depending on the model. For GPT-3.5-turbo, the limit is 4096 tokens.

| Question      | Answer                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| Required      | No                                                                                                            |
| Sample Value  | `512`                                                                                                         |
| Documentation | [OpenAI: What are tokens?](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) |
