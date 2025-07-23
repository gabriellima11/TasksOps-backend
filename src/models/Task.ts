import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  helpdesk: { type: String, required: true},
  description: { type: String, required: true},
  author:{type: String, required: true},
  company:{type: String, required: true}
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);