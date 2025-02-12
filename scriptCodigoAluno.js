function carregarCodigo(aluno,aluno1,aluno2,ficha,exercicio){
    historico.push({ // rever
        tipo_avaliacao: ficha,
        exercicio: exercicio,
        nome_aluno: aluno,
        mostrarFichas: false,
        mostrarAlunos: false,
        mostrarExercicios: false,
        mostrarTabela: true
    })

    // rever titulo
    // document.getElementById('titulo').textContent=`Exercicios da ${ficha} de ${aluno}`;
    document.getElementById('lista_alunos').style.display = 'none';
    document.getElementById('fichas_aluno').style.display = 'none';
    document.getElementById('exercicios_ficha_aluno').style.display = 'none';
    document.getElementById('tabela_container').style.display = 'none';
    document.getElementById('codigo_alunos').style.display = 'block'
    document.getElementById('botao_voltar').style.display = 'block';
    document.getElementById('titulo').textContent = `Códigos dos alunos ${aluno1} e ${aluno2}`

    const codigo_alunos = []

    // fazer o fetch para aluno1 e para aluno2
    Promise.all([
        fetch(`http://localhost:3000/${ficha}_${exercicio}_${aluno1}/codigos_alunos`)
            .then(res => res.json()),
        fetch(`http://localhost:3000/${ficha}_${exercicio}_${aluno2}/codigos_alunos`)
            .then(res => res.json())
    ])
    .then(([codigo1, codigo2]) => {
        codigo_alunos.push(codigo1, codigo2);
        createTable(codigo_alunos); // Call table creation
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    
}

function createTable(codigo_alunos) {
    let table = document.createElement("table");
    table.border = "1"; // Optional: Adds borders to the table

    let tr = document.createElement("tr");

    codigo_alunos.forEach(codigo => {
        let td = document.createElement("td");
        let pre = document.createElement("pre"); // Create a <pre> element
        pre.textContent = codigo[0].codigo; // Add the formatted code
        td.appendChild(pre);
        tr.appendChild(td);
    });
    

    table.appendChild(tr);

    let container = document.getElementById("codigo_alunos");
    container.innerHTML = ""; // Clear previous content
    container.appendChild(table);
    
}
