import CryptoJS from "crypto-js";
import { configDotenv } from "dotenv";
import { nanoid } from "nanoid";
import { License } from "../models/license.model.js";

configDotenv();

const AES_SECRET = process.env.AES_SECRET;

export const getKeys = async (req, res) => {
  const keys = await License.find({ user: req.params.id });

  res.status(200).send(keys);
};

export const unlink = async (req, res) => {
  const key = await License.findByIdAndUpdate(req.params.id, {
    fingerprint: "",
  });

  res.status(200).send(key);
};

export const createLicense = async (req, res) => {
  const license = nanoid(64);

  res.status(200).json({ license });
};

export const validate = async (req, res) => {
  const { cipherText } = req.body;

  var bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET);
  var { macs, uuid, license } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  try {
    const existingLicense = await License.findOne({ license });

    if (!existingLicense) return res.status(404).send("Invalid license");

    if (existingLicense.expiry < new Date())
      return res.status(404).send("Expired license");

    const fingerprint = CryptoJS.MD5(macs, uuid).toString();

    if (!existingLicense.fingerprint) {
      existingLicense.fingerprint = fingerprint;
      existingLicense.save();
      return res.json({ license });
    }

    if (existingLicense.fingerprint !== fingerprint)
      return res
        .status(404)
        .send(
          "License already in use! Kindly remove access from the other device by logging into the portal."
        );

    return res.json({ license });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
