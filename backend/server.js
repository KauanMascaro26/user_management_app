const express = require('express');
const cors = require('cors');

require('./database/database');

const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json({
    limit: '10mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(userRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'User Management API is online'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});