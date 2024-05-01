# p1fabricio
# API de Cadastro e Autenticação JWT

Este projeto é uma API simples que permite o cadastro e a autenticação de usuários utilizando JSON Web Tokens (JWT).

## Instalação

1. Instale o Node.js e o npm.
2. Clone este repositório.
3. Navegue até a pasta do projeto no terminal.
4. Execute o comando `npm install` para instalar as dependências.

## Uso

### Cadastro

Envie uma requisição POST para a rota `/register` com um corpo que contém os dados do usuário:
Nos testes de implementação utilizei o postmam para realizar os registros de consultas.
```json
{
  "username": "usuario",
  "password": "senha"
}

Acessar:  localhost:3000/register
A mensagem de retorno deverá ser, usuário cadastrado!

Enviar um post com o usuário cadastrado.
Caso o usuário existe, retornará um token de acesso.
