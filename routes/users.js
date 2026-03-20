const express = require("express");
const buildZodSchema = require("../utils/buildZodSchema");

function createUsersRouter(schema) {
  const router = express.Router();
  const users = [{ id: "1", name: "Jeremy", email: "jeremy@example.com" }];
  const userInputSchema = buildZodSchema(schema);

  router.get("/", (req, res) => {
    res.json(users);
  });

  router.get("/:id", (req, res) => {
    const user = users.find((item) => item.id === req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  });

  router.post("/", (req, res) => {
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

  return router;
}

module.exports = createUsersRouter;
