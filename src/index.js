import dotenv from "dotenv"; // Load Environment Variables
import connectToMongo from "./database/db-connection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

//Connection to MongoDB
connectToMongo()
  .then(() => {
    //Listening to the Server on Port 5000
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `⚙️  Taskify Todo listening on port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed !!! ", error);
  });

app.get("/", (req, res) => {
  res.json(`Hello I am the Express Server from Render.com ${process.env.PORT}`);
});
