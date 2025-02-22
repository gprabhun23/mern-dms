const mongoose = require('mongoose');

// Document Schema (Concept #7: Data Modeling, Concept #2: Indexing)
const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true }, // Indexed for faster search
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner reference
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Create a compound index for efficient search by title and owner (Concept #2: Indexing)
DocumentSchema.index({ title: 1, owner: 1 });

module.exports = mongoose.model('Document', DocumentSchema);
