const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors())

// Configuração da base de dados
const db = mysql.createConnection({
    host: '192.168.0.101',
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

app.get('/:atributo/:tabela', (req, res) => {
    const atributo = req.params.atributo.split('_');
    const tabela = req.params.tabela; // Extrai o nome da tabela da URL
    console.log(tabela)
    console.log(atributo)
    // Consulta os dados da tabela dinâmica
    db.query(`SELECT ?? FROM ??`, [atributo,tabela], (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);  // Retorna os dados no formato JSON
    });
});

