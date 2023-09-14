const express = require("express");
const md5 = require("crypto-js/md5");
const requestIp = require("request-ip");
const cors = require("cors");

require("dotenv").config();
const PORT = parseInt(process.env.PORT) || 3001;

const app = express();
app.use(cors());

app.use("/generateFingerprint", async (req, res) => {
  const ip = requestIp.getClientIp(req);
  const useragent = req.headers["user-agent"];

  console.log("IP: ", ip);
  console.log("User Agent: ", useragent);

  const fingerprint = md5(ip + useragent).toString();

  res.json({ fingerprint });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
