import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

export default mongoose.model("Company", companySchema);