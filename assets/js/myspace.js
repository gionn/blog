(function () {
  'use strict';

  var STORAGE_KEY = 'gionn:myspace';
  var SOUND_KEY = 'gionn:myspace-sound';
  var root = document.documentElement;
  var toggle = document.querySelector('.myspace-toggle');

  function save(on) {
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch (e) {
      // Preference just won't survive the next page.
    }
  }

  function readSound() {
    try {
      return window.localStorage.getItem(SOUND_KEY) !== '0';
    } catch (e) {
      return true;
    }
  }

  function saveSound(on) {
    try {
      window.localStorage.setItem(SOUND_KEY, on ? '1' : '0');
    } catch (e) {
      // Same: the choice lives for this page only.
    }
  }

  var resizeListener = null;
  var songButton = null;
  var gestureArmed = false;

  function setSongState(on) {
    if (songButton) {
      songButton.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  // A restored page has no user gesture, so the browser keeps the audio context
  // suspended until the reader clicks or types anywhere.
  function onFirstGesture(event) {
    // The controls' own click handlers decide; resuming here first would make
    // the note think playback is already on and mute instead.
    if (event && event.target && event.target.closest &&
        event.target.closest('.myspace-toggle')) {
      return;
    }
    if (!readSound() || root.getAttribute('data-theme') !== 'myspace') {
      disarmGesture();
      return;
    }
    window.myspaceSong.start();
    if (window.myspaceSong.playing()) {
      disarmGesture();
    }
  }

  function armGesture() {
    if (gestureArmed || !window.myspaceSong) {
      return;
    }
    gestureArmed = true;
    window.addEventListener('pointerdown', onFirstGesture, true);
    window.addEventListener('keydown', onFirstGesture, true);
  }

  function disarmGesture() {
    if (!gestureArmed) {
      return;
    }
    gestureArmed = false;
    window.removeEventListener('pointerdown', onFirstGesture, true);
    window.removeEventListener('keydown', onFirstGesture, true);
  }

  function addSongButton() {
    if (songButton || !window.myspaceSong) {
      return;
    }
    var wrap = document.querySelector('.myspace-toggle-wrap');
    if (!wrap) {
      return;
    }
    songButton = document.createElement('button');
    songButton.type = 'button';
    songButton.className = 'myspace-toggle myspace-song';
    songButton.setAttribute('aria-label', 'Toggle background music');
    songButton.title = 'Background music';
    songButton.textContent = '♪';
    songButton.addEventListener('click', function () {
      // Act on what is actually audible, not on the stored preference: on a
      // restored page the browser may still be holding the audio back.
      if (window.myspaceSong.playing()) {
        saveSound(false);
        setSongState(false);
        window.myspaceSong.stop();
        disarmGesture();
      } else {
        saveSound(true);
        setSongState(true);
        window.myspaceSong.start();
        armGesture();
      }
    });
    wrap.appendChild(songButton);
  }

  // The ticker is fixed, so the theme's fixed sidebar and the content column
  // need to be pushed down by its real height.
  function measureBanner() {
    var banner = document.querySelector('.myspace-banner');
    if (banner) {
      root.style.setProperty('--myspace-banner-height', banner.offsetHeight + 'px');
    }
  }

  function decorate() {
    if (document.querySelector('.myspace-banner')) {
      return;
    }

    var banner = document.createElement('div');
    banner.className = 'myspace-banner';
    banner.setAttribute('aria-hidden', 'true');
    var text = document.createElement('span');
    // Two identical halves, so scrolling one half (translateX(-50%)) loops
    // seamlessly and the bar is never empty. Each half is wider than any
    // viewport the ticker spans.
    var lines = [
      '★ Thanks for visiting! Leave a comment in my guestbook! ',
      '★ Thanks for stopping by my little corner of the web! ',
      '★ Best viewed at 1024x768 in Internet Explorer 6 '
    ];
    var half = lines.join('') + lines.join('') + lines.join('');
    text.textContent = half + half;
    banner.appendChild(text);
    // Fixed positioning keeps it out of the desktop flex row.
    document.body.insertBefore(banner, document.body.firstChild);
    measureBanner();

    if (!resizeListener) {
      resizeListener = measureBanner;
      window.addEventListener('resize', resizeListener);
    }

    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
      var profile = document.createElement('p');
      profile.className = 'myspace-profile';
      profile.innerHTML =
        'Mood: nostalgic <span class="myspace-sparkle" aria-hidden="true">★</span>' +
        '<br>Listening to: dial-up modem';
      sidebar.appendChild(profile);
    }

    addSongButton();
    setSongState(readSound());
  }

  function undecorate() {
    if (window.myspaceSong) {
      window.myspaceSong.stop();
    }
    disarmGesture();
    if (songButton) {
      songButton.parentNode.removeChild(songButton);
      songButton = null;
    }

    var injected = document.querySelectorAll(
      '.myspace-banner, .myspace-profile, .myspace-sparkle'
    );
    Array.prototype.forEach.call(injected, function (node) {
      node.parentNode.removeChild(node);
    });
    root.style.removeProperty('--myspace-banner-height');

    if (resizeListener) {
      window.removeEventListener('resize', resizeListener);
      resizeListener = null;
    }
  }

  // Always tries to play when the sound preference is on. After a navigation
  // the browser has no gesture yet, so the context stays suspended until the
  // reader interacts; armGesture covers that case.
  function apply(on) {
    if (on) {
      root.setAttribute('data-theme', 'myspace');
      decorate();
      if (readSound() && window.myspaceSong) {
        window.myspaceSong.start();
        armGesture();
      }
    } else {
      root.removeAttribute('data-theme');
      undecorate();
    }

    if (toggle) {
      toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  // The head snippet already painted the attribute, the rest is built here.
  apply(root.getAttribute('data-theme') === 'myspace');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var on = root.getAttribute('data-theme') !== 'myspace';
      save(on);
      apply(on);
    });
  }
})();
