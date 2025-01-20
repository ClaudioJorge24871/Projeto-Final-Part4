function carregarFicha(){
    fetch(`http://localhost:3000/${aluno}/ficha/`)
        .then(response => response.json())
        .then(dados => {
            const listaAlunos = document.getElementById('lista-fichas');

            listaAlunos.innerHTML = '';

            dados.forEach(element => {
                if(element.aluno){
                    const li = document.createElement('li')
                    const link = document.createElement('a')
                    link.href = `fichaAluno.html?aluno=${element.aluno}`;
                    link.textContent = element.aluno
                    li.appendChild(link)
                    listaAlunos.appendChild(li)
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}
window.onload = carregarAlunos;