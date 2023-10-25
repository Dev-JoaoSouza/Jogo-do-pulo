function menu() {
    let nav = document.getElementById("nav");
    let img = document.getElementById("icon");
    let head = document.getElementById("header");
    if (nav.className === "nav") {
        nav.className += " subMenu";
        head.className = "sub";
        img.innerHTML = "<img src='img/close.svg' alt='icone do menu'>";
    } else {
        nav.className = "nav";
        head.className = "";
        img.innerHTML = "<img src='img/menu.svg' alt='icone do menu'>";
    }
}

const pag1 = document.getElementById("pag1");
const pag2 = document.getElementById("pag2");
const game = document.querySelector('.game-board');
const btn = document.querySelector('.btn');

let personGame;
let personDead;

function mario() {
    pag1.classList.add('invisivel');
    pag2.classList.remove('invisivel');
    let person = "<img src='img/mario.gif' alt='personagem' class='personagem' style='width: 100px'>";
    game.innerHTML = game.innerHTML + person;
    personGame = 'img/mario.gif';
    personDead = 'img/game-over-mario.png';
    btn.setAttribute("onclick", "inicio();");
}

function sonic() {
    pag1.classList.add('invisivel');
    pag2.classList.remove('invisivel');
    let person = "<img src='img/sonic.gif' alt='personagem' class='personagem' style='width: 80px'>";
    game.innerHTML = game.innerHTML + person;
    personGame = 'img/sonic.gif';
    personDead = 'img/game-over-sonic.png'
    btn.setAttribute("onclick", "inicio();");
}

function inicio() {
    const tubo = document.querySelector('.tubo');
    const nuvens = document.querySelector('.nuvem')
    const pag2 = document.getElementById("pag2");
    pag2.classList.add('invisivel')
    btn.setAttribute("onclick", "pular();");
    btn.innerHTML = "Pular";
    tubo.classList.add('animatubo');
    nuvens.classList.add('animanuvem');
    loop = setInterval(colisao, 20);
}

function pular() {
    let person = document.querySelector('.personagem');
    person.classList.add('jump');
    setTimeout(() => {
        person.classList.remove('jump');
    }, 500);
}

function colisao() {
    const person = document.querySelector('.personagem');
    const tubo = document.querySelector('.tubo');
    const nuvem = document.querySelector('.nuvem');
    const pipePosition = tubo.offsetLeft;
    const personPosition = +window.getComputedStyle(person).bottom.replace('px', '');
    const cloudPosition = nuvem.offsetLeft;

    const score = document.querySelector('.score-value');
    score.innerHTML = +score.innerHTML + 1;

    if (pipePosition < 80 && pipePosition > 0 && personPosition < 60) {
        tubo.classList.remove('animatubo');
        tubo.style.left = `${pipePosition}px`;

        nuvem.classList.remove('animanuvem');
        nuvem.style.left = `${cloudPosition}px`;

        person.style.animation = "none";
        person.style.bottom = `${personPosition}px`
        person.src = personDead;
        person.style.width = '75px';

        const gameOver = document.getElementById("gameover");
        gameOver.classList.remove('invisivel');

        btn.setAttribute("onclick", "reiniciar();");
        btn.innerHTML = "Reiniciar";

        clearInterval(loop);
    }
}

function reiniciar() {
    const person = document.querySelector('.personagem');
    const tubo = document.querySelector('.tubo');
    const nuvem = document.querySelector('.nuvem');
    person.removeAttribute('style');
    tubo.removeAttribute('style');
    nuvem.removeAttribute('style');

    person.src = personGame;

    btn.setAttribute("onclick", "inicio();");
    btn.innerHTML = "Iniciar";

    const gameOver = document.getElementById("gameover");
    gameOver.classList.add('invisivel');

    const pag2 = document.getElementById("pag2");
    pag2.classList.remove('invisivel');

    const score = document.querySelector('.score-value');
    score.innerHTML = "0000";
}

document.addEventListener('keydown', pular);