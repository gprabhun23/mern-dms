const express = require('express');
const {
  getUserById,
  getAllUsers,
  deleteUser
} = require('../controllers/userController'); // Ensure all functions are imported correctly

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
// ✅ Delete user account
router.delete('/delete', authMiddleware, deleteUser);

// ✅ Get all users (Admin only - ensure proper role-based access)
router.get('/all', authMiddleware, getAllUsers);

// ✅ Get a specific user by ID (Admin or self-access)
router.get('/:id', authMiddleware, getUserById);

module.exports = router;
