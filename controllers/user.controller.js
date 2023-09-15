import crypto from "crypto-js";

export const getFingerprint = async (req, res) => {
  const { macs, uuid } = req.body;
  const fingerprint = crypto.MD5(macs, uuid).toString();
  return res.json({ fingerprint });
};
