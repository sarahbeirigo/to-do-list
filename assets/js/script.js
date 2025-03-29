

function salvarTarefaLocalStorage() {
    const input = document.getElementById("tarefa-input");
    const descricao = input.value.trim();

    if (descricao === "") return; // Evita salvar tarefas vazias

    // Recupera o array de tarefas do localStorage (ou inicializa um array vazio)
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    let novaTarefa = {
        descricao: descricao,
        status: 'a' // 'a' para ativa e 'c' para concluído
    };

    // Adiciona a nova tarefa ao array
    tarefas.push(novaTarefa);

    // Salva o array atualizado no localStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    // Limpa o input
    input.value = "";
    
}

