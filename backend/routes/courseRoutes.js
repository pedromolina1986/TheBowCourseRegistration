import express from "express";
const router = express.Router();

router.get("/courses", (req, res) => {
  res.json({ ok: true, route: "GET /courses", query: req.query });
});

// read one
router.get("/courses/:id", (req, res) => {
  res.json({ ok: true, route: "GET /courses/:id", params: req.params });
});

// create
router.post("/courses", (req, res) => {
  res.status(201).json({ ok: true, route: "POST /courses", body: req.body });
});

// update (PUT)
router.put("/courses/:id", (req, res) => {
  res.json({ ok: true, route: "PUT /courses/:id", params: req.params, body: req.body });
});

// delete
router.delete("/courses/:id", (req, res) => {
  res.json({ ok: true, route: "DELETE /courses/:id", params: req.params });
});

// search
router.get("/courses/search/:keyword", (req, res) => {
  res.json({ ok: true, route: "GET /courses/search/:keyword", params: req.params });
});

// optional stub to keep a consistent endpoint 
router.post("/courses/register", (req, res) => {
  res.status(400).json({ ok: false, route: "POST /courses/register", note: "Use /registrations instead" });
});

export default router;
