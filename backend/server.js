
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Call a Python LLM bridge (placeholder-safe)
function callPythonLLM(message, history, onResult) {
  const py = spawn("python", ["bridge.py"]);
  let output = "";

  py.stdin.write(JSON.stringify({ message, history }));
  py.stdin.end();

  py.stdout.on("data", (data) => output += data.toString());
  py.on("close", () => onResult(output.trim() || "Réponse IA (placeholder)"));
}

app.post("/chat", (req, res) => {
  const { message, history } = req.body;
  callPythonLLM(message, history, (response) => {
    res.json({ response });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend on http://localhost:" + PORT));
