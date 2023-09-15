import mongoose from "mongoose";

const LicenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  license: String,
  fingerprint: String,
  expiry: Date,
});

export const License = mongoose.model("license_keys", LicenseSchema);
