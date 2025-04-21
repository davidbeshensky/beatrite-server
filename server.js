const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/device-data", bodyParser.text({ type: "*/*" }));

app.get("/", (req, res) => {
  res.send("🚀 Beatrite Server is running!");
});

app.post("/device-data", (req, res) => {
  console.log("--- Incoming device request ---");
  console.log("Headers:", req.headers);
  console.log("Type of req.body:", typeof req.body);
  console.log("Raw body:", req.body);

  let data;

  if (typeof req.body === "object" && req.body !== null) {
    data = req.body;
  } else {
    try {
      const raw =
        typeof req.body === "string"
          ? req.body
          : req.body?.toString?.("utf8") || "";
      console.log("Attempting to parse string:", raw);
      data = JSON.parse(raw);
    } catch (err) {
      console.log("Could not parse JSON:", err.message);
      data = { error: "Invalid JSON received", raw: req.body };
    }
  }

  console.log("Received data:", data);
  res.send({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
