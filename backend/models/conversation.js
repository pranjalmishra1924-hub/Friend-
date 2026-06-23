const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    role: String,
    content: mongoose.Schema.Types.Mixed
});

const ConversationSchema = new mongoose.Schema({
    userId: String,
    messages: [MessageSchema]
});

module.exports = mongoose.model(
    "Conversation",
    ConversationSchema
);