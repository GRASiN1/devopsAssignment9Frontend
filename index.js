require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Validate environment variables
const backendUrl = process.env.BACKEND_URL;
if (!backendUrl) {
  console.log("Error: BACKEND_URL environment variable is not set");
  process.exit(1);
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${backendUrl}/process`, req.body);
    res.send(response.data);
  } catch (error) {
    console.error("Error connecting to backend:", error.message);
    res.status(500).send("Error processing request");
  }
});

app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
  console.log(`Using backend URL: ${backendUrl}`);
});
