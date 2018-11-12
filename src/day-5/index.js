import { Howl, Howler } from 'howler';
import rewindSound from './rewind.mp3';
import playSound from './play.mp3';
import rockyou from './rock-you.mp3';

document.title = '#Music - Codevember 2018 by Manz';

const Sounds = {
  play: new Audio(playSound),
  rewind: new Audio(rewindSound)
};

const Analyser = class {

  constructor(url) {
    this.audio = new Howl({
      src: [url],
      loop: true
    });

    this.url = url;
    this.mode = 'freq'; // or 'wave'
    this.theme = 'classic';
    this.lcd = document.querySelector('.lcd');
    this.timerLcd = null;
    this.spectrum = document.querySelector('.spectrum');

    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser.connect(Howler.ctx.destination);
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.25;
    this.analyser.minDecibels = -128;
    this.analyser.maxDecibels = -16;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.createSpectrum();
  }

  setText(m) {
    this.lcd.classList.remove('off');
    this.lcd.textContent = m;
    clearTimeout(this.timerLcd);
    this.timerLcd = setTimeout(() => this.setInactive(), 2000);
  }

  setInactive() {
    this.timerLcd = null;
    this.lcd.classList.add('off');
    this.lcd.textContent = 'Stand by';
  }

  setMode(m) {
    this.mode = m;
  }

  setTheme(t) {
    this.theme = t;
    this.spectrum.dataset.theme = t;

    if (t.startsWith('wave'))
      this.setMode('wave');
    else
      this.setMode('freq');
  }

  play() {
    this.id = this.audio.play(this.id);
    setInterval(() => {
      this.update();
    }, 150);
  }

  pause() { this.audio.pause(); }

  moveTo(s) {
    console.log(this.audio.seek());
    this.audio.seek( (this.audio.seek() + s) % this.audio.duration() );
  }

  stop() {
    this.pause();
    this.audio.seek(0);
  }

  volUp() { this.audio.volume(this.audio.volume() + 0.1); }
  volDown() { this.audio.volume(this.audio.volume() - 0.1); }

  isPlaying() { return this.audio.playing(); }

  update() {
    this.dataArray = new Uint8Array(this.bufferLength);

    if (this.mode == 'freq')
      this.analyser.getByteFrequencyData(this.dataArray);
    else if (this.mode == 'wave')
      this.analyser.getByteTimeDomainData(this.dataArray);

    this.dB.forEach((e,i) => {
      e.style.setProperty('--y', `${ this.dataArray[i] }px`);
    });
  }

  getFreq() {
    return this.dataArray;
  }

  createSpectrum() {
    this.spectrum.innerHTML = '';  // fix Parcel HMR
    for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
      const div = document.createElement('div');
      this.spectrum.appendChild(div);
    }
    this.dB = Array.from(document.querySelectorAll('.spectrum div'));
  }
};

const analyser = new Analyser(rockyou);

document.querySelector('.play').onclick = function() {

  if (this.classList.contains('active'))
    analyser.pause();
  else
    analyser.play();

  analyser.setText('Play');
  this.classList.toggle('active');
};

document.querySelector('.stop').onclick = () => {
  Sounds.play.play();
  analyser.setText('Stop');
  analyser.stop();
  document.querySelector('.play').classList.remove('active');
};

document.querySelector('.back').onclick = () => {
  analyser.setText('REWIND');
  Sounds.rewind.play();
  analyser.moveTo(-4);
};

document.querySelector('.next').onclick = () => {
  analyser.setText('FORWARD');
  Sounds.rewind.play();
  analyser.moveTo(4);
};

document.querySelector('.volUp').onclick = () => {
  analyser.setText('Vol up');
  analyser.volUp();
};

document.querySelector('.volDown').onclick = () => {
  analyser.setText('Vol Down');
  analyser.volDown();
};

document.querySelector('.power').onclick = () => {
  location.href = 'https://twitter.com/Manz';
};

const modeButtons = Array.from(document.querySelectorAll('.vis button'));

modeButtons.forEach(e => {
  e.addEventListener('click', () => {
    modeButtons.forEach(e => e.classList.remove('active'));
    e.classList.add('active');
    analyser.setTheme(e.dataset.theme);
  });
});