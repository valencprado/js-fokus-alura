const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title');

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');    
});
curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');    
});
longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');    
});

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', `${contexto}`);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    switch(contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
            case "descanso-curto":
                titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
            case "descanso-longo":
                titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
            default:
                break;
    }
}