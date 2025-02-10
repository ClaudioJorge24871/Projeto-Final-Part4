// Define global variables
let selectedTipoDeAvaliacao;
let selectedExercicio;


function carregarComparacoes(aluno, tipo_de_avaliacao,exercicio){
    historico.push({ // Por verificar
        mostrarAlunos: false,
        mostrarFichas: false,
        mostrarExercicios: true,
        nome_Aluno: aluno,
        ficha: tipo_de_avaliacao
    })
    //Variaveis para passar no carregarCodigo
    selectedTipoDeAvaliacao = tipo_de_avaliacao;
    selectedExercicio = exercicio

    document.getElementById('titulo').textContent = `Tabela de comparacoes de ${tipo_de_avaliacao}, exercicio ${exercicio}`
    document.getElementById("exercicios_ficha_aluno").style.display = 'none';
    document.getElementById("tabela_container").style.display = 'block';
    /**
     * MOSTRAR E APAGAR OS OUTROS 
     */

    fetch(`http://localhost:3000/${tipo_de_avaliacao}_${exercicio}/comparacoesplagio`)
        .then(response => response.json())
        .then(comparacao => {
        
            const alunosSet = new Set();

            comparacao.forEach(({ aluno1, aluno2 }) => {
                alunosSet.add(aluno1);
                alunosSet.add(aluno2);
            });
            
            const alunos = Array.from(alunosSet); 

            const matriz = Array.from({ length: alunos.length }, () => 
                Array(alunos.length).fill('NaN')
            );

            comparacao.forEach(({ aluno1, aluno2, indPlagio }) => {
                const rowIndex = alunos.indexOf(aluno1);
                const colIndex = alunos.indexOf(aluno2);
                matriz[rowIndex][colIndex] = indPlagio;
                matriz[colIndex][rowIndex] = indPlagio;
            });
            
            criarTabela(alunos,matriz);
        }).catch(error => {
            console.error('Erro ao carregar dados das comparacoes:', error);
        });
}


function criarTabela(alunos,matriz){
    const tabelaContainer = document.getElementById("tabela_container")
    tabelaContainer.innerHTML = ''; //Limpa tabela anterior
    const tabela = document.createElement("table")
    tabela.border = '1';
    tabela.style.borderCollapse = 'collapse';
    //Criação do cabeçalho
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader); //celula vazia para alinhar os nomes

    alunos.forEach(aluno => {
        const headerCell = document.createElement('th');
        headerCell.textContent = aluno;
        headerRow.appendChild(headerCell);
    });
    tabela.appendChild(headerRow);

    alunos.forEach((aluno, rowIndex) => {
        const row = document.createElement('tr');
    
        const alunoCell = document.createElement('th');
        alunoCell.textContent = aluno;
        row.appendChild(alunoCell);
    
        matriz[rowIndex].forEach((indicePlagio, colIndex) => {  
            const data = document.createElement('td');
    
            // Apply class based on value
            const className = getCellClass(indicePlagio);
            data.classList.add(className);
    
            // Create the link
            const link = document.createElement('a');
            link.textContent = indicePlagio;
            link.classList.add("valorAluno"); 
            link.href = "#";
    
            // Ensure that rowIndex !== colIndex (avoid self-comparison)
            if (rowIndex !== colIndex) {
                const aluno1 = alunos[rowIndex];
                const aluno2 = alunos[colIndex];
                // Add click event to call carregarCodigo
                link.onclick = function () {
                   carregarCodigo(aluno1, aluno2, selectedTipoDeAvaliacao, selectedExercicio);
                };
            }
            
            data.appendChild(link);
            row.appendChild(data);
        });
    
        tabela.appendChild(row)
    });

    tabelaContainer.appendChild(tabela)

}

function getCellClass(value) {
    if (value === "NaN" || isNaN(value)) return "nan"; // Handle both string and real NaN cases
    const num = parseFloat(value);
    
    if (num >= 80) return "high"; // Red for high plagiarism
    if (num >= 50) return "medium"; // Orange for moderate plagiarism
    return "low"; // Light green for low plagiarism
}
