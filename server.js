const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const compression = require("compression")

app.use(cors())
app.use(compression())

// Configuração da base de dados
const db = mysql.createConnection({
    host: '192.168.0.103',
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
    if(tabela == "alunos"){
        db.query(`SELECT ?? FROM ??`, [atributo,tabela], (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);  // Retorna os dados no formato JSON
        });
    }else if (tabela == "fichas_aluno"){
        const searchValue = `%${atributo.join(' ')}%`;
        db.query(`SELECT DISTINCT tipo_de_avaliacao FROM ?? WHERE aluno2 LIKE ?`, [tabela,searchValue], (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);  // Retorna os dados no formato JSON
        });
    }else if (tabela == "exercicios_ficha_aluno"){
        db.query(`SELECT exercicio from ?? 
            where aluno like ? 
            and tipo_de_avaliacao like ?
            order by exercicio;`, [tabela, `%${atributo[0]}%`,`%${atributo[1]}%`] , (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);  // Retorna os dados no formato JSON
        });
    }else if(tabela == "comparacoesplagio"){
        db.query(`SELECT aluno1,aluno2,indPlagio from ??
            where tipo_de_avaliacao like ? 
            and exercicio like ?
            order by aluno1;` , [tabela, `%${atributo[0]}%`,`%${atributo[1]}%`] , (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);  // Retorna os dados no formato JSON
        });
    }

    
});

