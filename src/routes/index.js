const express = require("express");
const router = express.Router();

const chatbotController = require("../controllers/chatbotController");

module.exports = function () {

    /** Chat **/
    router.post("/api/chat", chatbotController.chat);

    router.get("/api/chat/questions", chatbotController.questions);


    /** CRUD Preguntas y Respuestas **/
    router.post("/api/chatbot", chatbotController.addQuestion);

    router.get("/api/chatbot", chatbotController.getAllQuestions);

    router.get("/api/chatbot/:idChatbot", chatbotController.getQuestionById);

    router.put("/api/chatbot/:idChatbot", chatbotController.updateQuestionById);

    router.delete("/api/chatbot/:idChatbot", chatbotController.deleteQuestionById);

    return router;
};