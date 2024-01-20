function criaGame() {
    return {
        tubo: document.querySelector('.tubo'),
        nuvem: document.querySelector('.nuvem'),
        game: document.querySelector('.game-board'),
        pag1: document.querySelector('.pag1'),
        pag2: document.querySelector('.pag2'),
        gameOver: document.querySelectorAll('.game-over'),
        button: document.querySelector('.btn'),
        personGame: "",
        personDead: "",
        person: "",
        loop: "",

        start() {
            this.actions();
            this.keyboard();
        },
        
        colisao() {
            const person = document.querySelector('.personagem');
            const tubo = document.querySelector('.tubo');
            const nuvem = document.querySelector('.nuvem');
            const gameOver = document.querySelector(".game-over");
            const btn = document.querySelector('.btn');
            const pipePosition = tubo.offsetLeft;
            const personPosition = +window.getComputedStyle(person).bottom.replace('px', '');
            const cloudPosition = nuvem.offsetLeft;

            const score = document.querySelector('.score-value');
            let num = Number(score.innerHTML);
            num += 5;
            num = num.toString().padStart(4, '0');
            score.innerHTML = num;

            if (pipePosition < 80 && pipePosition > 0 && personPosition < 60) {
                tubo.classList.remove('animatubo');
                tubo.style.left = `${pipePosition}px`;
        
                nuvem.classList.remove('animanuvem');
                nuvem.style.left = `${cloudPosition}px`;
        
                person.style.animation = "none";
                person.style.bottom = `${personPosition}px`
                person.src = game.personDead;
                person.style.width = '75px';
        
                gameOver.classList.remove('hidden');

                btn.classList.remove('pular');
                btn.classList.add('hidden');
                
                clearInterval(game.loop);
            }
        },

        actions() {
            addEventListener('click', e => {
                const el = e.target;

                if (el.classList.contains('mario')) {
                    const pag1 = document.querySelector('.pag1');
                    const pag2 = document.querySelector('.pag2');
                    pag1.classList.add('hidden');
                    pag2.classList.remove('hidden');
                    this.person = "<img src='img/mario.gif' alt='personagem' class='personagem' style='width: 100px'>";
                    this.game.innerHTML = this.game.innerHTML + this.person;
                    this.button.classList.remove('hidden');
                    this.button.classList.add("iniciar");
                    this.personGame = 'img/mario.gif';
                    this.personDead = 'img/game-over-mario.png';
                };

                if (el.classList.contains('sonic')) {
                    const pag1 = document.querySelector('.pag1');
                    const pag2 = document.querySelector('.pag2');
                    pag1.classList.add('hidden');
                    pag2.classList.remove('hidden');
                    this.person = "<img src='img/sonic.gif' alt='personagem' class='personagem' style='width: 80px'>";
                    this.game.innerHTML = this.game.innerHTML + this.person;
                    this.button.classList.remove('hidden');
                    this.button.classList.add("iniciar");
                    this.personGame = 'img/sonic.gif';
                    this.personDead = 'img/game-over-sonic.png';
                };

                if (el.classList.contains('pular')) {
                    this.pular();
                };

                if (el.classList.contains('iniciar')) {
                    this.inicio();
                };

                if (el.classList.contains('restart')) {
                    const person = document.querySelector('.personagem');
                    const tubo = document.querySelector('.tubo');
                    const nuvem = document.querySelector('.nuvem');
                    person.removeAttribute('style');
                    tubo.removeAttribute('style');
                    nuvem.removeAttribute('style');
                
                    person.src = this.personGame;
                
                    const gameOver = document.querySelector(".game-over");
                    gameOver.classList.add('hidden');
                
                    const pag2 = document.querySelector(".pag2");
                    pag2.classList.remove('hidden');
                
                    const score = document.querySelector('.score-value');
                    score.innerHTML = "0000";

                    this.button.classList.remove('hidden');
                    this.button.classList.add("iniciar");
                    this.button.innerHTML = "Iniciar";
                };

                if (el.classList.contains('outro-personagem')) {
                    const game = document.querySelector('.game-board');
                    const tubo = document.querySelector('.tubo');
                    const nuvem = document.querySelector('.nuvem');
                    const pag1 = document.querySelector('.pag1');
                    const gameOver = document.querySelector('.game-over');

                    tubo.removeAttribute('style');
                    nuvem.removeAttribute('style');
                    pag1.classList.remove('hidden');
                    gameOver.classList.add('hidden');

                    game.removeChild(game.lastChild);

                    const score = document.querySelector('.score-value');
                    score.innerHTML = "0000";
                };
            });
        },

        keyboard() {
            const btn = document.querySelector('.btn');
            document.addEventListener('keydown', () => {
                if (btn.classList.contains('pular')) {
                    this.pular();
                }

                if (btn.classList.contains('iniciar')) {
                    this.inicio();
                }
            });
        },

        inicio() {
            const pag2 = document.querySelector('.pag2');
            const btn = document.querySelector('.btn');
            const tubo = document.querySelector('.tubo');
            const nuvem = document.querySelector('.nuvem');
            pag2.classList.add('hidden');
            btn.classList.remove('iniciar');
            btn.classList.add('pular');
            btn.innerHTML = 'Pular';
            tubo.classList.add('animatubo');
            nuvem.classList.add('animanuvem');
            this.loop = setInterval(this.colisao, 100);
        },

        pular() {
            const person = document.querySelector('.personagem');
            person.classList.add('jump');
            setTimeout(() => person.classList.remove('jump'), 500);
        },
    }
}

const game = criaGame();
game.start();