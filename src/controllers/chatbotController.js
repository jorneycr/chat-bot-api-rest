const Chatbot = require('../models/chatbot');

exports.chat = async (req, res) => {
    const { question } = req.body;

    try {
        const response = await Chatbot.findOne({ question: question });

        if (response) {
            return res.json({ answer: response.answer });
        } else {
            return res.json({ answer: 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?' });
        }
    } catch (error) {
        console.error('Error al buscar en la base de datos:', error);
        return res.status(500).json({ answer: 'Ocurrió un error al procesar tu consulta.' });
    }
}

exports.questions = async (req, res) => {
    try {
        const questions = await Chatbot.find({});
        const questionsList = questions.map(q => q.question);
        return res.status(200).json(questionsList);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener las preguntas.' });
    }
}

exports.addQuestion = async (req, res) => {
    const chatbot = new Chatbot(req.body);

    try {
        const newQuestion = await chatbot.save();
        return res.status(201).json({
            mensaje: "Se agregó una nueva pregunta y respuesta al chatbot.",
            data: newQuestion
        });
    } catch (error) {
        console.error('Error al agregar la pregunta:', error);
        return res.status(500).json({ error: 'Ocurrió un error al agregar la pregunta.' });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Chatbot.find({});
        return res.status(200).json(questions);
    } catch (error) {
        console.error('Error al obtener las preguntas 2:', error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener las preguntas.' });
    }
}

exports.getQuestionById = async (req, res) => {
    try {
        const chatbot = await Chatbot.findById(req.params.idChatbot);
        if (!chatbot) {
            return res.status(404).json({ mensaje: "La pregunta no existe" });
        }
        return res.status(200).json(chatbot);
    } catch (error) {
        console.error('Error al mostrar la pregunta:', error);
        return res.status(500).json({ error: 'Ocurrió un error al obtener las preguntas.' });
    }
}

exports.updateQuestionById = async (req, res) => {
    try {
        const chatbot = await Chatbot.findOneAndUpdate({ _id: req.params.idChatbot }, req.body, { new: true });
        return res.status(200).json(chatbot);
    } catch (error) {
        console.error('Error al actualizar la pregunta:', error);
        return res.status(500).send(error);
    }
}

exports.deleteQuestionById = async (req, res) => {
    try {
        const chatbot = await Chatbot.findById(req.params.idChatbot);
        if (!chatbot) {
            return res.status(404).json({ mensaje: "Ese chatbot no existe" });
        }
        await Chatbot.findOneAndDelete({ _id: req.params.idChatbot });
        return res.status(200).json({ mensaje: 'La pregunta se ha eliminado' });
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        return res.status(500).send(error);
    }
}
