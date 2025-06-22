import mongoose, { model } from "mongoose"; // Import mongoose module

const { Schema } = mongoose; // Destructure Schema from mongoose

// Create a new Schema
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const users = model("users", usersSchema); // Create a new model from the Schema
users
  .createIndexes()
  .then(() => {
    // console.log("Index created successfully!");
  })
  .catch((err) => {
    console.error("Error creating index:", err);
  }); // Create Indexes for the Schema
export default users; // Export the model
