const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, CI/CD!");
});

app.get("/user/:id", (req, res) => {
    res.json({ id: req.params.id, name: "John Doe" });
});

app.post("/user", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    res.status(201).json({ id: 1, name });
});

// Export app for testing
module.exports = app;
