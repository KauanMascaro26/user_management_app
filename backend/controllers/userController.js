const db = require('../database/database');

const createUser = (req, res) => {
    const { name, email } = req.body;

    db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                name,
                email
            });
        }
    );
};

module.exports = {
    createUser
};