import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import contactRouter from "./Routes/contactRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

/* CORS CONFIG */

const allowedOrigins = [
  "http://localhost:5173",
  // later add Netlify URL here
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* MIDDLEWARE */
app.use(express.json());

/* ROUTES */
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

/* HEALTH CHECK */
app.get("/health", (req, res) => {
  res.send("Contact Manager API is running 🚀");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend working fine" });
});

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

/* SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
