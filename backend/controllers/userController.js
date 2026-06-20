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

const getUsers = (req, res) => {
    db.all(
        'SELECT * FROM users',
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(200).json(rows);
        }
    );
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM users WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                message: 'User deleted successfully'
            });
        }
    );
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    db.run(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                message: 'User updated successfully'
            });
        }
    );
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser
};