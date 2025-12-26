import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import contactRouter from "./Routes/contactRoutes.js";

dotenv.config();

const app = express();

/* CORS – FINAL, STABLE */

/*
 * This is the MOST stable CORS setup.
 * - Works with browser preflight
 * - Works on Render free tier
 * - Works with localhost & Netlify
 * - No wildcard routes
 * - No origin callback bugs
*/

app.use(
  cors({
    origin: true, // 👈 allow request origin automatically
    credentials: true,
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
