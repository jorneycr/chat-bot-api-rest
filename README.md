# API Mini Chatbot

Esta es una API para un chatbot que permite gestionar preguntas y respuestas, así como autenticar usuarios. Utiliza Express para el servidor, Mongoose para interactuar con MongoDB y JWT para la autenticación.

## Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **MongoDB Atlas** (o una instancia local de MongoDB)


## Configuración del Proyecto

### 1. Clona el repositorio:

```bash
git clone https://github.com/jorneycr/chat-bot-api-rest

```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Crea un archivo .env.development en la raíz del proyecto con las siguientes variables de entorno

```bash
CONNECTION_STRING=mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<NOMBRE_BASE_DE_DATOS>?retryWrites=true&w=majority
PORT=5000
HOST="0.0.0.0"
REACT_APP_EMAIL=<TU_EMAIL>
REACT_APP_PASSWORD=<TU_CONTRASEÑA>

```

### 4. Correr proyecto

```bash
npm start dev

```

### 5. Correr tests

```bash
npm test

```

## Probar la API REST

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/chat | Envía una pregunta al chatbot. La respuesta se devuelve en formato JSON. Incluye una opción para listar todas las preguntas si se envía `/preguntas` como pregunta. |
| GET | /api/chat/questions | Obtiene una lista de todas las preguntas almacenadas en el chatbot. |
| POST | /api/chatbot | Crea una nueva pregunta y respuesta en el chatbot. Datos en formato JSON son requeridos. |
| GET | /api/chatbot | Obtiene todas las preguntas y respuestas del chatbot. |
| GET | /api/chatbot/:idChatbot | Obtiene una pregunta y respuesta específica por ID. |
| PUT | /api/chatbot/:idChatbot | Actualiza una pregunta y respuesta específica por ID. Datos en formato JSON son requeridos. |
| DELETE | /api/chatbot/:idChatbot | Elimina una pregunta y respuesta específica por ID. |
| POST | /auth/signup | Registra un nuevo usuario. Datos en formato JSON son requeridos. |
| POST | /auth/login | Autentica a un usuario y retorna un token JWT. Datos en formato JSON son requeridos. |


## Probar Preguntas

No tienen accentos, ni caracteres especiales

```bash
hola
como estas
que eres
cual es tu version
que hora es
donde vives
cuantos años tienes
que puedes hacer
como te llamas
que es tu proposito
que es la inteligencia artificial
cuanto es 2 mas 2
como se dice gracias en ingles
que es un chatbot
dime un chiste
como te siento
cual es la capital de españa
como se dice hola en frances
que es la tecnologia
donde esta la sede de google
que idiomas hablas
como se llama el creador de apple
como se hace una pizza
cuantos continentes hay
quien descubrio america
que es un algoritmo
dime una receta de ensalada
como se dice adios en ingles
que es el cambio climatico
que es un navegador web
como se hace una cuenta en facebook
que es un sistema operativo
dime una curiosidad

```