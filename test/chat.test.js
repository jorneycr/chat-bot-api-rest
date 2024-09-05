const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const Chatbot = require('../src/models/chatbot');
require("dotenv").config({ path: "./.env.development" });

describe('Chatbot API', function() {
  let testChatbotId;
  let authToken;

  before(function(done) {
    // Conectar a la base de datos antes de las pruebas
    mongoose.connect(process.env.CONNECTION_STRING)
      .then(() => {
        // Autenticar al usuario antes de comenzar los tests
        request(app)
          .post('/auth/login')
          .send({ email: process.env.REACT_APP_EMAIL, password: process.env.REACT_APP_PASSWORD })
          .expect(200)
          .then(res => {
            authToken = res.body.token;
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  after(function(done) {
    // Limpiar la colección después de finalizar las pruebas
    Chatbot.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done);
  });

  it('debería crear una nueva pregunta y respuesta', function(done) {
    request(app)
      .post('/api/chatbot')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ question: '¿Qué es Node.js?', answer: 'Un entorno de ejecución para JavaScript.' })
      .expect(201)
      .expect(res => {
        if (res.body.mensaje !== 'Se agregó una nueva pregunta y respuesta al chatbot.') throw new Error('Mensaje de respuesta incorrecto');
        if (res.body.data.question !== '¿Qué es Node.js?') throw new Error('Pregunta incorrecta');
        testChatbotId = res.body.data._id;
        if (!testChatbotId) throw new Error('ID es undefined');
      })
      .end(done);
  });

  it('debería obtener todas las preguntas', function(done) {
    request(app)
      .get('/api/chat/questions')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(res => {        
        if (!Array.isArray(res.body)) throw new Error('La respuesta no es un array');
      })
      .end(done);
  });

  it('debería obtener una pregunta y respuesta específica por ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .get(`/api/chatbot/${testChatbotId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(res => {
        if (res.body._id !== testChatbotId) throw new Error('ID incorrecto');
        if (res.body.question !== '¿Qué es Node.js?') throw new Error('Pregunta incorrecta');
      })
      .end(done);
  });

  it('debería actualizar una pregunta y respuesta específica por ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .put(`/api/chatbot/${testChatbotId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ answer: 'Un entorno de ejecución para JavaScript.' })
      .expect(200)
      .expect(res => {
        if (res.body.answer !== 'Un entorno de ejecución para JavaScript.') throw new Error('Respuesta incorrecta');
      })
      .end(done);
  });

  it('debería eliminar una pregunta y respuesta específica por ID', function(done) {
    if (!testChatbotId) {
      console.error("No se puede realizar la prueba porque 'testChatbotId' es undefined.");
      done();
      return;
    }

    request(app)
      .delete(`/api/chatbot/${testChatbotId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(res => {
        if (res.body.mensaje !== 'La pregunta se ha eliminado') throw new Error('Mensaje de respuesta incorrecto');
      })
      .end(done);
  });

  it('debería devolver 404 para una pregunta que no existe', function(done) {
    request(app)
      .get(`/api/chatbot/66d8a92599584376dca61742`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404)
      .expect(res => {
        if (res.body.mensaje !== 'La pregunta no existe') throw new Error('Mensaje de respuesta incorrecto');
      })
      .end(done);
  });
});
