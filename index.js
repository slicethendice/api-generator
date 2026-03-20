const express = require("express");
const fs = require("fs");
const path = require("path");
const { z } = require("zod");

const app = express();
const PORT = 4040;

app.use(express.json());

const schemaPath = path.join(__dirname, "schema", "user.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

console.log("Loaded schema:", schema);

const users = [{ id: "1", name: "Jeremy", email: "jeremy@example.com" }];

const userInputSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const result = userInputSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid user input",
      details: result.error.flatten(),
    });
  }

  const newUser = result.data;

  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
