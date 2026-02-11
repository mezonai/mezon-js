import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/js", express.static(path.join(__dirname, "js")));

app.listen(PORT, () => {
  console.log(`🌍 Web Server running at http://localhost:${PORT}`);
});
