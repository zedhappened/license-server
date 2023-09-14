const express = require("express");
const md5 = require("crypto-js/md5");
const requestIp = require("request-ip");
var bodyParser = require("body-parser");
const cors = require("cors");

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
  const ip = requestIp.getClientIp(req);
  const useragent = req.headers["user-agent"];
  const network = JSON.stringify(req.body).toString();

  const fingerprint = md5(ip + useragent + network).toString();

  res.json({ fingerprint });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
