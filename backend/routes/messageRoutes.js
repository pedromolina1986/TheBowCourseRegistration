import express from "express";
const router = express.Router();

// send a message (contact form)
router.post("/messages", (req, res) => {
  res.status(201).json({ ok: true, route: "POST /messages", body: req.body });
});

// list messages (admin)
router.get("/messages", (req, res) => {
  res.json({ ok: true, route: "GET /messages" });
});

export default router;
