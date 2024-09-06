const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

exports.createUser = async (req, res) => {
    const usuario = new Usuario(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.status(200).json({ mensaje: 'Usuario Creado Correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error' });
    }
}

exports.authUser = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
        return res.status(404).json({ mensaje: 'Ese usuario no existe' });
    }

    // El usuario existe, verificar el password es correcto o incorrecto
    if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ mensaje: 'Password Incorrecto' });
    }

    // Password correcto, firmar el token
    const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id
    },
        'LLAVESECRETA',
        {
            expiresIn: '1h'
        });

    // Retornar el token
    return res.status(200).json({ token });
}
