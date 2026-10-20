// A two-voice chiptune loop for the MySpace easter egg, generated with Web
// Audio so there is no audio file to ship.
(function () {
  'use strict';

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var STEP = 60 / 132 / 2; // eighth notes at 132 BPM
  var LOOKAHEAD = 0.1;

  // MIDI notes, one per eighth, with the bass changing every two steps.
  var melody = [
    72, 76, 79, 76, 74, 72, 74, 76,
    72, 76, 79, 81, 79, 76, 74, 72
  ];
  var bass = [48, 48, 53, 53, 55, 55, 48, 48];

  var context = null;
  var master = null;
  var timer = null;
  var nextNote = 0;
  var step = 0;

  function frequency(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function tone(midi, at, duration, type, peak) {
    var osc = context.createOscillator();
    var gain = context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency(midi), at);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(peak, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(at);
    osc.stop(at + duration + 0.05);
  }

  function schedule() {
    // After the context resumes from a blocked autoplay, currentTime may be far
    // ahead of the scheduled cursor; skip instead of firing a burst of notes.
    if (nextNote < context.currentTime - 0.2) {
      nextNote = context.currentTime + 0.05;
    }
    while (nextNote < context.currentTime + LOOKAHEAD) {
      tone(melody[step], nextNote, STEP * 0.9, 'square', 0.12);
      if (step % 2 === 0) {
        tone(bass[step / 2], nextNote, STEP * 1.8, 'triangle', 0.16);
      }
      nextNote += STEP;
      step = (step + 1) % melody.length;
    }
  }

  function ready() {
    if (!context) {
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = 0.2;
      master.connect(context.destination);
    }
    if (context.state === 'suspended') {
      context.resume();
    }
  }

  function start() {
    if (!AudioContext) {
      return false;
    }
    // Called from a click, because that is the only way sound may start.
    ready();
    if (timer) {
      return true;
    }
    step = 0;
    nextNote = context.currentTime + 0.05;
    timer = window.setInterval(schedule, 25);
    return true;
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
    if (context && context.state === 'running') {
      context.suspend();
    }
  }

  window.myspaceSong = {
    start: start,
    stop: stop,
    playing: function () {
      return timer !== null && context !== null && context.state === 'running';
    }
  };
})();
