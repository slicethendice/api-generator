const express = require("express");
const fs = require("fs");
const path = require("path");
const createUsersRouter = require("./routes/users");

const app = express();
const PORT = 4040;

app.use(express.json());

const schemaPath = path.join(__dirname, "schema", "user.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

console.log("Loaded schema:", schema);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/users", createUsersRouter(schema));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
