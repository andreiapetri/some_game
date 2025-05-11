const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'saves.json');

// Initialize empty saves file
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '{}');
}

// Middleware
app.use(cors());
app.use(express.json());

// Save game endpoint
app.post('/save', (req, res) => {
    try {
        const { userId, data } = req.body;
        const saves = JSON.parse(fs.readFileSync(DATA_FILE));
        
        saves[userId] = data;
        fs.writeFileSync(DATA_FILE, JSON.stringify(saves, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ error: 'Failed to save game' });
    }
});

// Load game endpoint
app.get('/load/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const saves = JSON.parse(fs.readFileSync(DATA_FILE));
        
        if (!saves[userId]) {
            return res.status(404).json({ error: 'No save found' });
        }
        
        res.json(saves[userId]);
    } catch (error) {
        console.error('Load error:', error);
        res.status(500).json({ error: 'Failed to load game' });
    }
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});