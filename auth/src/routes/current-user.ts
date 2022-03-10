import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    res.send("Whats poppins!")
});

export { router as currentUserRouter };
