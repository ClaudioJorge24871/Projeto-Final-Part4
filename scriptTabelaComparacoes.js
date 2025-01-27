function carregarComparacoes(aluno,tipo_de_avaliacao,exercicio){
    historico.push({ // Por verificar
        mostrarAlunos: false,
        mostrarFichas: false,
        mostrarExercicios: true,
        nome_Aluno: aluno,
        ficha: tipo_de_avaliacao
    })

    document.getElementById('titulo').textContent = `Tabela de comparacoes de ${tipo_de_avaliacao}, exercicio ${exercicio}`
    document.getElementById("exercicios_ficha_aluno").style.display = 'none';
    document.getElementById("tabela_container").style.display = 'block';
    /**
     * MOSTRAR E APAGAR OS OUTROS 
     */

    fetch(`http://localhost:3000/${tipo_de_avaliacao}_${exercicio}/comparacoesplagio`)
        .then(response => response.json())
        .then(comparacao => {
            const alunosSet = new Set()

            comparacao.forEach(x => {
                alunosSet.add(x.aluno1)
                alunosSet.add(x.aluno2)
            });

            const alunos = Array.from(alunosSet).sort() //[al1,al2,al3]

            const matriz = Array.from({ length: alunos.length }, () => 
                Array(alunos.length).fill('0')
            );            

            // Coloca o valor do plagio nas interseções dos alunos
            comparacao.forEach(y => {
                const rowIndex = alunos.indexOf(y.aluno1)
                const colIndex = alunos.indexOf(y.aluno2)
                matriz[rowIndex][colIndex] = y.indPlagio
                matriz[colIndex][rowIndex] = y.indPlagio
            })

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

            //Criação das linhas da tabela
            alunos.forEach((aluno,rowIndex) => {
                const row = document.createElement('tr')

                const alunoCell = document.createElement('th')
                alunoCell.textContent = aluno
                row.appendChild(alunoCell)

                matriz[rowIndex].forEach(indicePlagio => {
                    const data = document.createElement('td')

                    data.textContent = indicePlagio
                    row.appendChild(data)
                })

                tabela.appendChild(row)
            });

            tabelaContainer.appendChild(tabela)

        })
        .catch(error => {
            console.error('Erro ao carregar dados das comparacoes:', error);
        });

}