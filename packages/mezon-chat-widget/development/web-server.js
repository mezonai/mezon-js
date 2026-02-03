
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html at root
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve styles
app.get('/styles.css', (req, res) => {
   res.sendFile(path.join(__dirname, 'styles.css'));
});

// Serve public directory (where built widget resides)
app.use(express.static(path.join(__dirname, 'public')));

// Serve js directory if needed
app.use('/js', express.static(path.join(__dirname, 'js')));

app.listen(PORT, () => {
   console.log(`🌍 Web Server running at http://localhost:${PORT}`);
});
