function carregarFichas(aluno){
    historico.push({
        nome_Aluno: aluno,
        mostrarAlunos: true,
    })
    
    document.getElementById('lista_alunos').style.display = 'none';
    document.getElementById('titulo').textContent=`Fichas de ${aluno}`;
    document.getElementById('fichas_aluno').style.display = 'block';
    document.getElementById('botao_voltar').style.display = 'block';

    fetch(`http://localhost:3000/${aluno}/fichas_aluno`)
        .then(response => response.json())
        .then(fichas => {
            const fichasAluno = document.getElementById('fichas_aluno');
            fichasAluno.innerHTML = '';

            fichas.forEach(element => {
                if(element.tipo_de_avaliacao){
                    const li = document.createElement('li');
                    li.classList.add('list-item'); // Add the class

                    const link = document.createElement('a');
                    link.href = "#";  // Não direciona para outra   página
                    link.textContent = element.tipo_de_avaliacao;
                    
                    const score = document.createElement('span');
                    score.textContent = element.media_plag;
                    
                    link.onclick = function() {
                        carregarExercicios(aluno,element.tipo_de_avaliacao);  // Chama a função para carregar as fichas
                    };

                    li.appendChild(link);
                    li.appendChild(score);
                    fichasAluno.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}
window.onload = carregarFichas;