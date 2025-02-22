const Document = require('../models/Document'); // Ensure Document model exists

// Upload Document (Concept #9: File Uploads)
const uploadDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newDocument = new Document({ title, content });
    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadDocument, getDocuments };
