const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuração da base de dados
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'claudio',
    password: 'Clauudio90#',
    database: 'compararplagiodb'
});

// Testar a conexão com a base de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar à base de dados:', err.message);
        process.exit(1);
    } else {
        console.log('Conexão com a base de dados bem-sucedida!');
        // Iniciar o servidor
        app.listen(3000, () => {
            console.log('Servidor em execução na porta 3000');
        });
    }
});

