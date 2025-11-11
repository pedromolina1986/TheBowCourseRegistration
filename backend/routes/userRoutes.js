import express from "express";
const router = express.Router();

// Auth 
router.post("/users/register", (req, res) => {
  res.status(201).json({ ok: true, route: "POST /users/register", body: req.body });
});

router.post("/users/login", (req, res) => {
  res.json({ ok: true, route: "POST /users/login", body: req.body });
});

// Users CRUD 
router.get("/users", (req, res) => {
  res.json({ ok: true, route: "GET /users" });
});

router.get("/users/:id", (req, res) => {
  res.json({ ok: true, route: "GET /users/:id", params: req.params });
});

router.post("/users", (req, res) => {
  res.status(201).json({ ok: true, route: "POST /users", body: req.body });
});

router.put("/users/:id", (req, res) => {
  res.json({ ok: true, route: "PUT /users/:id", params: req.params, body: req.body });
});

router.patch("/users/:id", (req, res) => {
  res.json({ ok: true, route: "PATCH /users/:id", params: req.params, body: req.body });
});

router.delete("/users/:id", (req, res) => {
  res.json({ ok: true, route: "DELETE /users/:id", params: req.params });
});

export default router;
