
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mysql = require("mysql");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

const credentials = {
  host: "localhost",
  user: "root", 
  password: "",
  database: "hea",
};

app.get("/", (req, res) => {
  res.send("hola desde tu primera ruta de la Api");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const values = [username, password];
  var connection = mysql.createConnection(credentials);
  connection.query(
    "SELECT * FROM login WHERE username = ? AND password = ?",
    values,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res.status(200).send({
            id: result[0].id,
            user: result[0].user,
            username: result[0].username,
          });
        } else {
          res.status(400).send("Usuario no existe");
        }
      }
    }
  );
  connection.end();
});

app.post("/api/register", (req, res) => {
  // Cambia el endpoint a '/api/register'
  const { username, password } = req.body;
  const values = [username, password];
  const sql = "INSERT INTO login (username, password) VALUES (?, ?)"; // Cambia la tabla a 'login'
  var connection = mysql.createConnection(credentials);
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Usuario creado correctamente");
    }
  });
  connection.end();
});

app.get("/api/login", (req, res) => {

  const sql = "SELECT * FROM login"; 
  var connection = mysql.createConnection(credentials);
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
  connection.end();
});

app.get("/api/login/:id", (req, res) => {

  const id = req.params.id;
  const sql = "SELECT * FROM login WHERE id = ?"; 
  var connection = mysql.createConnection(credentials);
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    }
  });
  connection.end();
});

app.put("/api/login/:id", (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const values = [username, password, id];
  const sql = "UPDATE login SET username = ?, password = ? WHERE id = ?"; 
  var connection = mysql.createConnection(credentials);
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Usuario actualizado correctamente");
    }
  });
  connection.end();
});

app.delete("/api/login/:id/", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM login WHERE id = ?"; 
  var connection = mysql.createConnection(credentials);
  connection.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Usuario eliminado correctamente");
    }
  });
  connection.end();
});

app.listen(4000, () => console.log("hola el servidor de tony esta listo"));