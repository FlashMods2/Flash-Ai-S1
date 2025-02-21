const express = require('express');
const cors = require('cors'); // CORS module import karo
const fs = require('fs');

const app = express();

app.use(cors()); // CORS enable karo
app.use(express.json()); // JSON data ke liye middleware

// Data file
const DATA_FILE = 'data.json';

// Read JSON file function
function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Write JSON file function
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Verify Key API
app.post('/verify-key', (req, res) => {
    const { key, deviceId } = req.body;
    const data = readData();
    
    if (data.keys.includes(key)) {
        return res.json({ success: true, message: "Login Successful!" });
    }
    return res.status(401).json({ success: false, message: "Invalid Key!" });
});

// Add Key API
app.post('/add-key', (req, res) => {
    const { key } = req.body;
    const data = readData();

    if (!data.keys.includes(key)) {
        data.keys.push(key);
        writeData(data);
        return res.json({ message: "Key Added Successfully!" });
    }
    return res.status(400).json({ message: "Key Already Exists!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
