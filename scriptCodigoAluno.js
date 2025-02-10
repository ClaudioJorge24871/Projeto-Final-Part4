function carregarCodigo(aluno1,aluno2,ficha,exercicio){
    historico.push({ // rever
        ficha: ficha,
        exercicio: exercicio,
        mostrarFichas: false,
        mostrarAlunos: false,
        mostrarExercicios: false,
        mostrarCodigo: true
    })

    // rever titulo
    // document.getElementById('titulo').textContent=`Exercicios da ${ficha} de ${aluno}`;
    document.getElementById('lista_alunos').style.display = 'none';
    document.getElementById('fichas_aluno').style.display = 'none';
    document.getElementById('exercicios_ficha_aluno').style.display = 'none';
    document.getElementById('tabela_container').style.display = 'none';
    document.getElementById('codigo_alunos').style.display = 'block'
    document.getElementById('botao_voltar').style.display = 'block';
    //
    console.log(aluno1,aluno2,ficha,exercicio)



    // fazer o fetch para aluno1
    fetch(`http://localhost:3000/${ficha}_${exercicio}_${aluno1}/codigos_alunos`)
        .then(response => response.json())
        .then(codigos => {
            // Select the element where you want to display the JSON
            const codigo = document.getElementById("codigo_alunos");
    
            // Format JSON for better readability
            codigo.textContent = JSON.stringify(codigos, null, 2);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

            