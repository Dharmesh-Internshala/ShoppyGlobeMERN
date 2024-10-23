import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./Routes/productroutes.js";
import cartRoutes from "./Routes/cartroutes.js"
import categoryroutes from "./Routes/categoryroutes.js";
import userroutes from "./Routes/userroutes.js";

const app = express();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Product routes
app.use('/api', productRoutes);

//cartRoutes
app.use("/api", cartRoutes)

//category routes
app.use("/api", categoryroutes)

//userroutes
app.use("/api", userroutes);

// Start the server
app.listen(5500, () => {
    console.log("Server is running on port 5500");
});

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/shoppyGlobe", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dd = mongoose.connection;

dd.on("open", () => {
    console.log("Connection is successfully established");
});

dd.on("error", (err) => {
    console.error("Connection error:", err);
});
