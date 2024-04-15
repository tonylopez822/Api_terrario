// controllers/authController.js

const userModel = require("../models/user");

// Controlador para iniciar sesión
function login(req, res) {
  const { username, password } = req.body;
  userModel.getUserByUsernameAndPassword(username, password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (user) {
        res.status(200).json({
          id: user.id,
          username: user.username,
        });
      } else {
        res.status(400).send("Credenciales inválidas");
      }
    }
  });
}

function register(req, res) {
  const { username, password } = req.body;
  userModel.createUser(username, password, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Usuario creado correctamente");
    }
  });
}

module.exports = {
  login,
  register,
};
