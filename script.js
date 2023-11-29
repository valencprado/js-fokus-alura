const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

const musicaFundo = new Audio('./sons/luna-rise-part-one.mp3');
const somPausa = new Audio('./sons/pause.mp3');
const somPlay = new Audio('./sons/play.wav');
const somZerado = new Audio('./sons/beep.mp3');
const toggleMusica = document.getElementById('alternar-musica');

const comecarPausarBtn = document.getElementById('start-pause');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musicaFundo.loop = true; 

toggleMusica.addEventListener('change', () => {
    if (musicaFundo.paused) {
        musicaFundo.play();
    } else {
        musicaFundo.pause();
    }
})

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
    focoBtn.classList.add('active');
});
curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});
longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');

});


function alterarContexto(contexto) {
    html.setAttribute('data-contexto', `${contexto}`);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    });
    switch (contexto) {
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

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        somZerado.play();
        alert("tempo finalizado!");
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`);   
};

comecarPausarBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        somPausa.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;

}