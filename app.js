const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const port = 3001;
let inputText = null;
let data = null;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is Backend");
});

app.post("/convert", (req, res) => {
  const receivedText = req.body.text;
  console.log("Received text:", receivedText);
  res.status(200).json({ message: "Text received successfully" });
  inputText = receivedText;
});

app.get("/tts", async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("msg", inputText);
    encodedParams.set("lang", "Salli");
    encodedParams.set("source", "ttsmp3");

    const options = {
      method: "POST",
      url: "https://text-to-speech-for-28-languages.p.rapidapi.com/",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "b5c46bd1c8msh1b4f17c6dc918fbp10437ajsn8c9bf897eeb9",
        "X-RapidAPI-Host": "text-to-speech-for-28-languages.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    res.send(response.data.URL);
    // var data = response.data.URL;
    console.log(data)

  } catch (error) {
    console.error(error);
  }
});

app.get("/convert", (req, res) => {
  res.send(inputText);

});
// app.get("/tts", (req, res) => {
//   res.json(data);
// });

app.get("*", (req, res) => {
  res.send("This is 404 error page");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // console.log(data);   
});
