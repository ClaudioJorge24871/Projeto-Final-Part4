function carregarExercicios(aluno,ficha){
    historico.push({
        nome_Aluno: aluno,
        ficha: ficha,
        mostrarFichas: true,
        mostrarAlunos: false
    })

    document.getElementById('titulo').textContent=`Exercicios da ${ficha} de ${aluno}`;
    document.getElementById('lista_alunos').style.display = 'none';
    document.getElementById('fichas_aluno').style.display = 'none';
    document.getElementById('exercicios_ficha_aluno').style.display = 'block';
    document.getElementById('botao_voltar').style.display = 'block';

    // colocar a table
    fetch(`http://localhost:3000/${aluno}_${ficha}/exercicios_ficha_aluno`)
        .then(response => response.json())
        .then(exercicios => {
            const listaExercicios = document.getElementById('exercicios_ficha_aluno');

            listaExercicios.innerHTML = '';

            exercicios.forEach(element => {
                if(element.exercicio){
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "#";  // Não direciona para outra página
                    link.textContent = `Exercicio ${element.exercicio}`;
                    li.appendChild(link);
                    listaExercicios.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}

window.onload = carregarExercicios;