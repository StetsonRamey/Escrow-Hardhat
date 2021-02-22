const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const port = 3042;

app.use(cors());

const contracts = [];

// setup get route
app.get("/contract", (req, res) => {
  res.send(contracts);
});

// setup post route
app.post("/send", (req, res) => {
  console.log(req.body);

  res.send(200);
});

app.listen(port, () => {
  console.log(`🌎 server running on port ${port}`);
});
