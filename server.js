const express = require("express");
const path = require("path");

const app = express();
app.get("/", (req, res) => { res.sendFile(path.resolve("index.html")); });

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/img", express.static(path.resolve(__dirname, "img")));

app.listen(process.env.PORT || 5080, () => console.log("Server running ..."));
// "node server.js" for start server