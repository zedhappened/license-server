const express = require("express");
const md5 = require("crypto-js/md5");
const cors = require("cors");
var bodyParser = require("body-parser");

require("dotenv").config();
const PORT = parseInt(process.env.PORT) || 3001;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.post("/generateFingerprint", async (req, res) => {

  console.log(req.body);

  const macs = req.body.macs;
  const uuid = req.body.uuid;

  const fingerprint = md5(macs, uuid).toString();

  res.json({ fingerprint });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
