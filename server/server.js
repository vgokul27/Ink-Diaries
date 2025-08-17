import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogs.js";

dotenv.config();
const app = express();

await connectDB();

//Middleware
app.use(cors({ origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));