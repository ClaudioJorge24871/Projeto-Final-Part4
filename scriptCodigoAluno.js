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
    document.getElementById('codigo_alunos').style.display = 'flex';
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

    const code1 = codigo_alunos[0]?.[0]?.codigo || "";
    const code2 = codigo_alunos[1]?.[0]?.codigo || "";

    // Generate line differences
    const diff = Diff.diffLines(code1, code2);

    // Process code1 to highlight removed lines
    let code1Html = "";
    diff.forEach(part => {
        if (part.added) return; // Skip added parts in code1
        const lines = part.value.split('\n');
        lines.forEach(line => {
            if (line === "") return; // Skip empty lines
            const cls = part.removed ? 'removed' : '';
            code1Html += `<div class="line ${cls}">${line}</div>`;
        });
    });

    // Process code2 to highlight added lines
    let code2Html = "";
    diff.forEach(part => {
        if (part.removed) return; // Skip removed parts in code2
        const lines = part.value.split('\n');
        lines.forEach(line => {
            if (line === "") return;
            const cls = part.added ? 'added' : '';
            code2Html += `<div class="line ${cls}">${line}</div>`;
        });
    });

    // Create containers for both students
    [aluno1, aluno2].forEach((studentNum, index) => {
        const codigoContainer = document.createElement("div");
        codigoContainer.className = "codigo-container";

        const h3 = document.createElement("h3");
        h3.textContent = `Aluno ${index + 1}: ${studentNum}`;

        const pre = document.createElement("div");
        pre.className = "codigo";
        pre.innerHTML = index === 0 ? code1Html : code2Html;

        codigoContainer.append(h3, pre);
        container.append(codigoContainer);
    });
}
