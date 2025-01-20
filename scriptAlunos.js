function carregarAlunos(){
    fetch('http://localhost:3000/aluno/alunos')
        .then(response => response.json())
        .then(dados => {
            const listaAlunos = document.getElementById('lista_alunos');

            listaAlunos.innerHTML = '';

            dados.forEach(element => {
                if(element.aluno){
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "#";  // Não direciona para outra página
                    link.textContent = element.aluno;
                    link.onclick = function() {
                        carregarFichas(element.aluno);  // Chama a função para carregar as fichas
                    };
                    li.appendChild(link);
                    listaAlunos.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}
window.onload = carregarAlunos;