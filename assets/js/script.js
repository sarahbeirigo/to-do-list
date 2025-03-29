document.addEventListener("DOMContentLoaded", carregarTarefas);

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
    
    // Atualiza a lista na tela
    carregarTarefas();
}

function carregarTarefas() {
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = ""; // Limpa a lista antes de recriá-la


    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "align-center", "mb-6", "items-center");

        const container = document.createElement("div");
        container.classList.add("flex", "align-center")

        // Cria a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.status === 'c'; // Se a tarefa estiver concluída, marca a checkbox
        checkbox.classList.add("checkbox", "checkbox-info", "mr-2");


        // Define o comportamento da checkbox
        checkbox.addEventListener("change", () => {
            tarefa.status = checkbox.checked ? 'c' : 'a';

            // Atualiza o localStorage
            tarefas[index] = tarefa;
            localStorage.setItem("tarefas", JSON.stringify(tarefas));

            carregarTarefas();
        });

        // Cria um texto para a tarefa
        const textoTarefa = document.createElement("span");
        textoTarefa.classList.add("max-w-[180px]", "min-[370px]:max-w-[230px]",
        "md:max-w-[310px]","break-words");
        textoTarefa.textContent = tarefa.descricao;

        if (tarefa.status === 'c') {
            textoTarefa.classList.add("line-through"); 
        }

        const botao_excluir = document.createElement('button');
        botao_excluir.dataset.index = index; // Define o índice no botão

        botao_excluir.addEventListener("click", (event) => {
            const indexClicado = event.currentTarget.dataset.index; // Obtém o índice do botão clicado
            tarefas.splice(indexClicado, 1); // Remove a tarefa da lista
            localStorage.setItem("tarefas", JSON.stringify(tarefas)); // Atualiza o localStorage
            carregarTarefas();
        });

        const img = document.createElement('img');
        img.src = "./src/img/trash.png";
        img.alt = "excluir tarefa"
        botao_excluir.appendChild(img);

        // Adiciona a checkbox e o texto da tarefa à `li`
        container.appendChild(checkbox);
        container.appendChild(textoTarefa);

        li.appendChild(container);
        li.appendChild(botao_excluir);

        lista.appendChild(li);
    });
}


function adicionarTarefa() {
    salvarTarefaLocalStorage();
}


//adcionar nova tarefa ao clicar em "Enter" após a tarefa ser digitada
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

