const express = require('express');
const { uploadDocument, getDocuments } = require('../controllers/documentController'); // ✅ Ensure correct path

const router = express.Router();

// Document Routes (Concept #9: File Uploads)
router.post('/upload', uploadDocument); // ✅ Fix callback function
router.get('/', getDocuments); // ✅ Fix callback function

module.exports = router;
