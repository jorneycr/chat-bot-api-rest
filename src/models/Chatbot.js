const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatbotSchema = new Schema({
    question: String,
    answer: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chatbot', chatbotSchema);
