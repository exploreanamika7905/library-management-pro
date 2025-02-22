const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bookId: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    genre: { type: String },
    publicationYear: { type: Number },
    imgURL: { type: String, default: null },
    available: { type: Boolean, default: true },
    issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    reservedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date, default: null }
});

module.exports = mongoose.model('Book', bookSchema);