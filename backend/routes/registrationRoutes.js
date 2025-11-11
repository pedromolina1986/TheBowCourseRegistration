import express from "express";
const router = express.Router();

// create a registration
router.post("/registrations", (req, res) => {
  res.status(201).json({ ok: true, route: "POST /registrations", body: req.body });
});

// list registrations by user
router.get("/registrations/:userId", (req, res) => {
  res.json({ ok: true, route: "GET /registrations/:userId", params: req.params });
});

// delete a registration
router.delete("/registrations/:id", (req, res) => {
  res.json({ ok: true, route: "DELETE /registrations/:id", params: req.params });
});

export default router;
