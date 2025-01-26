function carregarComparacoes(tipo_de_avaliacao,exercicio){
    historico.push({ // Por verificar
        mostrarAlunos: false,
        mostrarFichas: false,
        mostrarExercicios: true
    })

    document.getElementById("exercicios_ficha_aluno").style.display = 'none';
    /**
     * MOSTRAR E APAGAR OS OUTROS 
     */

    fetch(`http://localhost:3000/${tipo_de_avaliacao}_${exercicio}/comparacoesplagio`)
        .then(response => response.json())
        .then(comparacao => {
            
        })
        .catch(error => {
            console.error('Erro ao carregar dados das comparacoes:', error);
        });

}