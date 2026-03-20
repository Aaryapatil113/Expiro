import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { connectDB } from "./config/db.js";
import initPassport from "./config/passport.js";
import productRoutes from "./routes/productRoutes.js";
import wasteReportRoutes from "./routes/wasteReportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Manual CORS headers
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://expiro-three.vercel.app",
    "https://expiro-857jdz019-aaryapatil113s-projects.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-role");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "expiro-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/waste-reports", wasteReportRoutes);

// Global error handler
app.use(errorHandler);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
