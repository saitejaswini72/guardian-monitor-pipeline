const express = require("express");
const app = express();
const port = 3000;

app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(port, () => {
  console.log(`Guardian_Monitor running at http://localhost:${port}`);
});
