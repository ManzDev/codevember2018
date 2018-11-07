import { Howl } from 'howler';
import song from './guru-josh.mp3';

document.title = '#Infinity - Codevember 2018 by Manz';

const audio = new Howl({
  src: [song],
  loop: true
});

let id;

const infinity = document.querySelector('.infinity');
infinity.addEventListener('click', () => {
  document.querySelector(':root').classList.add('animation');
  infinity.classList.add('animation');
  id = audio.play(id);
});