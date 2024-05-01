// Importando pacotes
const express = require('express');
const jwt = require('jsonwebtoken');

// Criando uma instância do Express
const app = express();

// Configurando o Express para usar JSON
app.use(express.json());

// Porta em que o servidor vai rodar
const port = 3000;

// Array para armazenar usuários cadastrados
let users = [];

// Rota de cadastro
app.post('/register', (req, res) => {
  const user = req.body; // pega o usuário do corpo da requisição
  users.push(user); // adiciona o usuário ao array de usuários
  res.send('Usuário cadastrado com sucesso!');
});
// Rota de Consulta dos usuários
app.get('/users', (req, res) => {
    res.json(users);
  });
// Rota de login
app.post('/login', (req, res) => {
  const user = req.body;

  // verifica se o usuário existe
  if (users.find(u => u.username === user.username)) {
    // se o usuário existir, cria um novo token para ele
    const token = jwt.sign(user, 'your-256-bit-secret');
    res.json({token});
  } else {
    res.send('Usuário não encontrado');
  }
});

// Configurando o servidor para escutar na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
