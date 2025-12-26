import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import contactRouter from "./Routes/contactRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* ROUTES */
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

/* HEALTH */
app.get("/health", (req, res) => {
  res.send("Contact Manager API is running 🚀");
});

/* DB */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
