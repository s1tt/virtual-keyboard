import Key from '../components/Key.js';
import { enKeys, enKeysCaps, ruKeys, ruKeysCaps, enKeysShift, enKeysCapsShift, ruKeysShift, ruKeysCapsShift } from '../utils/constants.js';
import { textArea, keyboardEl, keyTemplate } from '../utils/elements.js';

let isCaps = sessionStorage.getItem('isCaps') === 'true' || false;
let isShift = sessionStorage.getItem('isShift') === 'true' || false;
let isEng = sessionStorage.getItem('isEng') === 'false' || true;

const clearKeyboard = () => {
  while (keyboardEl.firstChild) {
    keyboardEl.removeChild(keyboardEl.firstChild);
  }
};

const createKey = (keyName, key) => {
  const keycap = keyTemplate.cloneNode(true);
  const newKeycap = new Key(keyName, key, keycap).generate();
  addKeyClass(keyName, newKeycap);
  keyboardEl.append(newKeycap);
};

const drowKeys = keysMap => {
  clearKeyboard();
  Object.entries(keysMap).forEach(([keyName, key]) => {
    createKey(keyName, key);
  });
};

const setCapsOn = function () {
  isCaps = true;
  sessionStorage.setItem('isCaps', isCaps);
  if (isEng) {
    drowKeys(enKeysCaps);
  } else {
    drowKeys(ruKeysCaps);
  }
};

const setCapsOff = function () {
  isCaps = false;
  sessionStorage.setItem('isCaps', isCaps);
  if (isEng) {
    drowKeys(enKeys);
  } else {
    drowKeys(ruKeys);
  }
};

const setShiftOn = function () {
  isShift = true;
  sessionStorage.setItem('isShift', isShift);
  if (isCaps && isEng) {
    drowKeys(enKeysCapsShift);
  } else if (!isCaps && isEng) {
    drowKeys(enKeysShift);
    //
  } else if (isCaps && !isEng) {
    drowKeys(ruKeysCapsShift);
  } else if (!isCaps && !isEng) {
    drowKeys(ruKeysShift);
  }
};

const setShiftOff = function () {
  isShift = false;
  sessionStorage.setItem('isShift', isShift);
  if (isCaps && isEng) {
    drowKeys(enKeysCaps);
  } else if (!isCaps && isEng) {
    drowKeys(enKeys);
    //
  } else if (isCaps && !isEng) {
    drowKeys(ruKeysCaps);
  } else if (!isCaps && !isEng) {
    drowKeys(ruKeys);
  }
};

const setLang = function () {
  if (isEng && isCaps) {
    drowKeys(ruKeysCaps);
  } else if (isEng && !isCaps) {
    drowKeys(ruKeys);
  } else if (!isEng && isCaps) {
    drowKeys(enKeysCaps);
  } else if (!isEng && !isCaps) {
    drowKeys(enKeys);
  }
  isEng = !isEng;
  sessionStorage.setItem('isEng', isEng);
};

const addKeyClass = (keyName, newKeycap) => {
  switch (keyName) {
    case 'CapsLock':
      newKeycap.classList.add('virtualKeyboard__keycap-caps');
      if (isCaps) {
        newKeycap.addEventListener('mousedown', () => {
          setCapsOff();
        });
        newKeycap.classList.add('virtualKeyboard__keycap_active');
      } else {
        newKeycap.addEventListener('mousedown', () => {
          setCapsOn();
        });
        newKeycap.classList.remove('virtualKeyboard__keycap_active');
      }
      break;
    case 'Tab':
      newKeycap.classList.add('virtualKeyboard__keycap-tab');
      break;
    case 'Backspace':
      newKeycap.classList.add('virtualKeyboard__keycap-back');
      break;
    case 'Space':
      newKeycap.classList.add('virtualKeyboard__keycap-space');
      break;
    case 'Enter':
      newKeycap.classList.add('virtualKeyboard__keycap-enter');
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      newKeycap.classList.add('virtualKeyboard__keycap-shift');
      newKeycap.addEventListener('mousedown', () => {
        setShiftOn();
        newKeycap.classList.add('virtualKeyboard__keycap_active');
      });
      newKeycap.addEventListener('mouseup', () => {
        setShiftOff();
        newKeycap.classList.remove('virtualKeyboard__keycap_active');
      });
      break;
    default:
      break;
  }
};

drowKeys(enKeys);

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.altKey) {
    // Смена языка
    setLang();
  }
});

document.addEventListener('keydown', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.add('virtualKeyboard__keycap_active');
    }
  });

  if (e.code === 'CapsLock') {
    if (!isCaps) {
      setCapsOn();
    } else {
      setCapsOff();
    }
  }

  if (e.code === 'Tab') {
    e.preventDefault();
    textArea.value += '	';
  }

  if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && (e.code !== 'AltLeft' || e.code !== 'AltRight')) {
    setShiftOn();
    if (e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`)) {
      e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
    } else {
      e.target.nextElementSibling.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
    }
  }
  if (e.code !== 'Backspace' && e.code !== 'Delete' && e.code !== 'CapsLock' && e.code !== 'Enter' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlLeft' && e.code !== 'MetaLeft' && e.code !== 'AltLeft' && e.code !== 'AltRight' && e.code !== 'ControlRight' && e.code !== 'Tab') {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      textArea.value += e.key;
    } else {
      textArea.value += enKeys[e.key];
    }
  }
});

document.addEventListener('keyup', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code && element.dataset.code !== 'CapsLock') {
      element.classList.remove('virtualKeyboard__keycap_active');

      if (element.dataset.code === 'ShiftLeft' || element.dataset.code === 'ShiftRight') {
        element.classList.remove('virtualKeyboard__keycap_active');
        setShiftOff();
      }
    }
  });
});

textArea.addEventListener('keydown', e => e.preventDefault());
