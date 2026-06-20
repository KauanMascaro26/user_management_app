const express = require('express');
const router = express.Router();

const {
    createUser,
    getUsers,
    deleteUser
} = require('../controllers/userController');


router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;