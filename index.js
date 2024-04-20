//Deploy backend on render.com
const cors = require("cors");
const express = require("express");
const connectToMongo = require("./dbConnection");

//Connection to MongoDB
connectToMongo();

//Express Server
const app = express();
const port = 5000;

//Middleware
app.use(express.json());

//CORS
app.use(cors()); // Keep this line before all the routes

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.json(`Hello I am the Express Server From Localhost ${port}`);
});

//Listening to the Server on Port 5000
app.listen(port, () => {
  console.log(`Taskify Todo listening on port http://localhost:${port}`);
});
