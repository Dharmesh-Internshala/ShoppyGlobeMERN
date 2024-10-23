import express from "express";
import { registerUser, loginUser } from "../Controller/usercontroller.js";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";


const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

router.get("/profile", isAuthenticatedUser, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
  });

export default router;
