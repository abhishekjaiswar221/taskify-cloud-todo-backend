import mongoose, { model } from "mongoose"; // Import mongoose module

const { Schema } = mongoose; // Destructure Schema from mongoose

// Create a new Schema
const UserSchema = new Schema({
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

const User = model("users", UserSchema); // Create a new model from the Schema
User.createIndexes()
  .then(() => {
    // console.log("Index created successfully!");
  })
  .catch((err) => {
    console.error("Error creating index:", err);
  }); // Create Indexes for the Schema
export default User; // Export the model
