const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const pDescricaoTarefa = document.querySelector('.app__section-active-task-description');

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function limparFormulario() {
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
}

function atualizarTarefa() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>



`
    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');

    p.textContent = tarefa.descricao;
    const btn = document.createElement('button');
    btn.classList.add('app_button-edit');
    btn.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        if (novaDescricao) {
            p.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefa();
        }

    }
    const imgBtn = document.createElement('img');

    imgBtn.setAttribute('src', './imagens/edit.png');

    btn.append(imgBtn);
    li.append(svg);
    li.append(p);
    li.append(btn);
    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        btn.setAttribute('disabled', true);
    }
    else {
        li.addEventListener('click', () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(li => {
                    li.classList.remove('app__section-task-list-item-active')
                });
            if (tarefaSelecionada == tarefa) {
                pDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            pDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        })
    }

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefa();
    limparFormulario();
})
btnCancelarTarefa.onclick = () => {
    limparFormulario();
};
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', true);
        tarefaSelecionada.completa = true;
        atualizarTarefa();
    }
})