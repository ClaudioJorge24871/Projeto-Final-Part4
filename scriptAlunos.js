function carregarAlunos() {
    document.getElementById('lista_alunos').style.display = 'block';
    document.getElementById('titulo').textContent = `Alunos`;
    document.getElementById('fichas_aluno').style.display = 'none';
    document.getElementById('botao_voltar').style.display = 'none';

    fetch('http://localhost:3000/aluno/alunos')
        .then(response => response.json())
        .then(dados => {
            const listaAlunos = document.getElementById('lista_alunos');
            listaAlunos.innerHTML = '';

            // Sort the alunos by media_plag in descending order
            dados.sort((a, b) => {
                return parseFloat(b.media_plag) - parseFloat(a.media_plag);
            });

            dados.forEach(element => {
                if (element.aluno) {
                    const li = document.createElement('li');
                    li.classList.add('list-item');

                    const link = document.createElement('a');
                    link.href = "#";
                    link.textContent = element.aluno;

                    const score = document.createElement('span');
                    score.textContent = element.media_plag;

                    link.onclick = function() {
                        carregarFichas(element.aluno);
                    };
                    li.appendChild(link);
                    li.appendChild(score);
                    listaAlunos.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}