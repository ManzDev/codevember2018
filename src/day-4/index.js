import { Howl } from 'howler';
import song from './bowser-offspring.mp3';
import booSound from './boo.mp3';

document.title = '#Sky - Codevember 2018 by Manz';

const go = document.querySelector('.go');
const boo = document.querySelector('.boo');
const content = document.querySelector('.content');

const audio = new Howl({
  src: [song],
  loop: true
});

const booNoise = new Howl({
  src: [booSound],
  volume: 0.6
});

let id;

const start = () => {
  go.remove();
  content.classList.add('animation');

  // Start music
  id = audio.play(id);

  // Trigger boo
  setTimeout(() => {
    booNoise.play();
    boo.classList.remove('off');
  }, 25000);
};

go.addEventListener('click', start);