const express = require("express");
const router = express.Router();

const chatbotController = require("../controllers/chatbotController");

const usuariosController = require("../controllers/usuariosController");

//middleware para proteger las rutas
const auth = require("../middleware/auth");

module.exports = function () {

    /** Chat **/
    router.post("/api/chat", auth, chatbotController.chat);

    router.get("/api/chat/questions", auth, chatbotController.questions);

    router.get("/api/chat/importQuestions", chatbotController.importQuestions);

    /** CRUD Preguntas y Respuestas **/
    router.post("/api/chatbot", auth, chatbotController.addQuestion);

    router.get("/api/chatbot", auth, chatbotController.getAllQuestions);

    router.get("/api/chatbot/:idChatbot", auth, chatbotController.getQuestionById);

    router.put("/api/chatbot/:idChatbot", auth, chatbotController.updateQuestionById);

    router.delete("/api/chatbot/:idChatbot", auth, chatbotController.deleteQuestionById);

    /** Auth **/
    router.post("/auth/signup", usuariosController.registrarUsuario);

    router.post("/auth/login", usuariosController.autenticarUsuario);

    return router;
};