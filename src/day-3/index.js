import { Howl } from 'howler';
import song from './its-not-unusual.mp3';

document.title = '#Carrot - Codevember 2018 by Manz';

const audio = new Howl({
  src: [song]
});

let id;

const TIME = 10;

const score = document.querySelector('.score');
const time = document.querySelector('.time');
const rabbit = Array.from(document.querySelectorAll('.rabbit'));

const Game = class {

  constructor() {
    this.max = 0;
    this.count = 0;
    time.dataset.time = TIME;
  }

  start() {

    this.playMusic();

    // Listen rabbits
    rabbit.forEach(r => r.addEventListener('click', () => this.killRabbit(r)));

    // Trigger showRabbits
    this.timer = setInterval(() => {

      const i = ~~(Math.random() * 3);
      const r = ~~(Math.random() * 2);

      if (r == 1)
        this.showRabbit(rabbit[i]);

    }, 200);

    // Update time
    this.tiempo = setInterval(() => {
      time.dataset.time--;
      time.textContent = `0:${time.dataset.time.padStart(2, 0)}`;
    }, 1000);

    // Ends game
    setTimeout(() => this.end(), TIME * 1000);
  }

  playMusic() {
    id = audio.play(id);
  }

  killRabbit(e) {
    this.count++;
    e.classList.add('off');
    score.innerHTML += '<b>🥕</b>';
  }

  hideRabbit(e) {
    e.classList.add('off');
  }

  showRabbit(e) {
    this.max++;
    e.classList.remove('off');
    setTimeout(() => this.hideRabbit(e), 2000);
  }

  putReset() {
    time.innerHTML = '<button>Again</button>';
    time.querySelector('button').onclick = () => location.reload();
  }

  end() {
    rabbit.forEach(r => r.classList.add('off'));
    score.classList.add('animation');
    score.innerHTML += '<br>';
    for (let i = 0; i < (this.max - this.count); i++)
      score.innerHTML += '<b class="not">🥕</b>';
    clearInterval(this.timer);
    clearInterval(this.tiempo);
    this.putReset();
  }

};

document.querySelector('#go').onclick = () => {
  const game = new Game();
  game.start();
};