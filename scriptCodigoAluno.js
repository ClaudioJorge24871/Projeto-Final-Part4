function carregarCodigo(aluno, aluno1, aluno2, ficha, exercicio) {
    historico.push({
        tipo_avaliacao: ficha,
        exercicio: exercicio,
        nome_aluno: aluno,
        mostrarFichas: false,
        mostrarAlunos: false,
        mostrarExercicios: false,
        mostrarTabela: true
    });

    document.getElementById('lista_alunos').style.display = 'none';
    document.getElementById('fichas_aluno').style.display = 'none';
    document.getElementById('exercicios_ficha_aluno').style.display = 'none';
    document.getElementById('tabela_container').style.display = 'none';
    document.getElementById('codigo_alunos').style.display = 'block';
    document.getElementById('botao_voltar').style.display = 'block';
    document.getElementById('titulo').textContent = `Códigos dos alunos ${aluno1} e ${aluno2}`;

    const codigo_alunos = [];

    // Fetch data for aluno1 and aluno2
    Promise.all([
        fetch(`http://localhost:3000/${ficha}_${exercicio}_${aluno1}/codigos_alunos`)
            .then(res => res.json()),
        fetch(`http://localhost:3000/${ficha}_${exercicio}_${aluno2}/codigos_alunos`)
            .then(res => res.json())
    ])
    .then(([codigo1, codigo2]) => {
        // Ensure the data is structured correctly before pushing
        if (codigo1 && codigo2) {
            codigo_alunos.push(codigo1, codigo2);
            createTable(codigo_alunos, aluno1, aluno2); // Pass student numbers to the table creation function
        } else {
            console.error("Error: Missing or invalid data for students");
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

function createTable(codigo_alunos, aluno1, aluno2) {
    const container = document.getElementById("codigo_alunos");
    container.innerHTML = "";

    // Create containers for both students
    [aluno1, aluno2].forEach((studentNum, index) => {
        const codigoContainer = document.createElement("div");
        codigoContainer.className = "codigo-container";

        const h3 = document.createElement("h3");
        h3.textContent = `Aluno ${index + 1}: ${studentNum}`;

        const pre = document.createElement("pre");
        pre.className = "codigo";
        pre.textContent = codigo_alunos[index]?.[0]?.codigo || "No code available";

        codigoContainer.append(h3, pre);
        container.append(codigoContainer);
    });
}
