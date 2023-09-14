const express = require("express");
const md5 = require("crypto-js/md5");
const requestIp = require("request-ip");

require("dotenv").config();
const PORT = parseInt(process.env.PORT);

const app = express();

app.use("/generateFingerprint", async (req, res) => {

  const ip = requestIp.getClientIp(req);
  const useragent = req.headers["user-agent"];

  console.log("IP: ",ip);
  console.log("User Agent: ",useragent);

  const fingerprint = md5(ip + useragent).toString();

  res.json({ fingerprint });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
