import { Howl } from 'howler';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import song from './wings.mp3';

document.title = '#Web - Codevember 2018 by Manz';

const audio = new Howl({
  src: [song],
  loop: true
});

let id;

const chrome = document.querySelector('.chrome');
const request = document.querySelector('.request');

tippy('.chrome', {
  content: 'Click me!',
  arrow: true,
  duration: 3000,
  animation: 'shift-away'
});
chrome._tippy.show(500);

request.style.setProperty('--request-x', '0px');
request.style.setProperty('--request-y', '0px');

const doRequest = () => {
  request.className = 'request file';
  request.style.setProperty('--request-x', '800px');
  setTimeout(() => {
    request.className = 'request';
    request.classList.add(['html', 'js', 'css', 'image'][~~(Math.random() * 4)]);
    request.style.setProperty('--request-x', '0px');
  }, 3000);
  setTimeout(doRequest, 6000);
};

chrome.addEventListener('click', function f() {
  id = audio.play(id);
  doRequest();
  chrome._tippy.destroy();
  chrome.removeEventListener('click', f);
});
