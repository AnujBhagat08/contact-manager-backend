import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import contactRouter from "./Routes/contactRoutes.js";
import cors from "cors";

dotenv.config({ quiet: true });

const app = express();

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// USER ROUTER
app.use("/api/user", userRouter);

//CONTECT ROUTER
app.use("/api/contact", contactRouter);

// Health check / root route
app.get("/health", (req, res) => {
  res.send("Contact Manager API is running 🚀");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is working home route" });
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
