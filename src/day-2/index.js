import { Howl } from 'howler';
import song from './only-time.mp3';

document.title = '#Time - Codevember 2018 by Manz';

const audio = new Howl({
  src: [song],
  loop: true
});

let id;

const content = document.querySelector('.content');
const clock = document.querySelector('.clock');
clock.addEventListener('click', () => {
  content.classList.add('animation');
  id = audio.play(id);
});