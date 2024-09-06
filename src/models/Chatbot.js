const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatbotSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,

    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Chatbot', chatbotSchema);
