import express, { json } from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";

//Express Server
const app = express();

//Middleware
app.use(json());

//CORS
app.use(cors()); // Keep this line before all the routes

//Routes
app.get("/", (_, res) => {
  res.status(200).json({
    msg: `Hello I am Express Server from Render.com`,
  });
});
app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

export { app };
