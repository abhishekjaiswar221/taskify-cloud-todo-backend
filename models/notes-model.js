import mongoose, { Schema as _Schema, model } from "mongoose"; // Import mongoose module

const { Schema } = mongoose;

// Declare the Schema of the Mongo model
const NotesSchema = new Schema({
  user: {
    type: _Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
export default model("notes", NotesSchema);
