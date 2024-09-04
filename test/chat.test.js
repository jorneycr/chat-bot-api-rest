const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Chatbot = require('../src/models/chatbot');

describe('Chatbot API', function() {
  let testChatbotId;

  before(function(done) {
    // Conectar a la base de datos antes de las pruebas
    const CONNECTION_STRING = 'mongodb+srv://jorneytech04:u7gNPXgUUap6xoh0@connectassistance.ah2ohjv.mongodb.net/chatbot?retryWrites=true&w=majority';
    mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => done())
      .catch(done);
  });

  after(function(done) {
    // Limpia la colección después de finalizar las pruebas
    Chatbot.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done);
  });

  it('should create a new question and answer', function(done) {
    request(app)
      .post('/api/chatbot')
      .send({ question: 'What is Node.js?', answer: 'A JavaScript runtime.' })
      .expect(201)
      .expect(res => {
        if (res.body.mensaje !== 'Se agregó una nueva pregunta y respuesta al chatbot.') throw new Error('Mensaje de respuesta incorrecto');
        if (res.body.data.question !== 'What is Node.js?') throw new Error('Pregunta incorrecta');
        testChatbotId = res.body.data._id;
        if (!testChatbotId) throw new Error('ID es undefined');
      })
      .end(done);
  });

  it('should get all questions', function(done) {
    request(app)
      .get('/api/chat/questions')
      .expect(200)
      .expect(res => {        
        if (!Array.isArray(res.body)) throw new Error('La respuesta no es un array');
      })
      .end(done);
  });
  
  it('should get a specific question and answer by ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .get(`/api/chatbot/${testChatbotId}`)
      .expect(200)
      .expect(res => {
        if (res.body._id !== testChatbotId) throw new Error('ID incorrecto');
        if (res.body.question !== 'What is Node.js?') throw new Error('Pregunta incorrecta');
      })
      .end(done);
  });

  it('should update a specific question and answer by ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .put(`/api/chatbot/${testChatbotId}`)
      .send({ answer: 'A runtime for JavaScript.' })
      .expect(200)
      .expect(res => {
        if (res.body.answer !== 'A runtime for JavaScript.') throw new Error('Respuesta incorrecta');
      })
      .end(done);
  });

  it('should delete a specific question and answer by ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .delete(`/api/chatbot/${testChatbotId}`)
      .expect(200)
      .expect(res => {
        if (res.body.mensaje !== 'La pregunta se ha eliminado') throw new Error('Mensaje de respuesta incorrecto');
      })
      .end(done);
  });

  it('should return 404 for a non-existing question', function(done) {
    request(app)
      .get(`/api/chatbot/66d8a92599584376dca61742`)
      .expect(404)
      .expect(res => {
        if (res.body.mensaje !== 'La pregunta no existe') throw new Error('Mensaje de respuesta incorrecto');
      })
      .end(done);
  });
});
