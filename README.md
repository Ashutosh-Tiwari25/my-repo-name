# Wallet + Password Auth API

A backend authentication system supporting both traditional (username/password) 
and Web3 (wallet signature) login, built with Express, SQLite, bcrypt, JWT, and ethers.js.

## Features
- Signup/login with hashed passwords (bcrypt)
- JWT-based session tokens
- SQLite persistent storage
- Wallet-based login via signature verification (ethers.js)

## Routes
- POST /signup — { username, password }
- POST /login — { username, password } → returns JWT
- GET /profile — requires Authorization: Bearer <token>
- GET /web3/message — returns a message to sign
- POST /web3/verify — { message, signature, address } → returns JWT

## Running locally
npm install
node server.js
