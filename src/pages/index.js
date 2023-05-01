import Key from '../components/Key.js';
import { enKeys, enKeysCaps, ruKeys, ruKeysCaps, enKeysShift, enKeysCapsShift, ruKeysShift, ruKeysCapsShift } from '../utils/constants.js';
import { body, header, mainTitle, main, virtualKeyboardSection, textArea, keyboardEl, keyTemplate, oprationSystem, commandForChangeLang } from '../utils/elements.js';

let isCaps = sessionStorage.getItem('isCaps') === 'true' || false;
let isShift = sessionStorage.getItem('isShift') === 'true' || false;
let isEng = sessionStorage.getItem('isEng') === 'false' || true;

textArea.addEventListener('keydown', e => e.preventDefault());

const drowKeys = function (keysMap) {
  console.log(isCaps);
  console.log(isShift);
  console.log(isEng);
  Array.from(keyboardEl.children).forEach(el => el.remove());
  for (const [keyName, key] of Object.entries(keysMap)) {
    const keycap = keyTemplate.cloneNode(true);
    const newKeycap = new Key(keyName, key, keycap).generate();
    if (keyName === 'CapsLock') {
      newKeycap.classList.add('virtualKeyboard__keycap-caps');
      // подсветка кнопки капс при перезагрузке
      if (isCaps) {
        newKeycap.classList.add('virtualKeyboard__keycap_active');
      } else {
        newKeycap.classList.remove('virtualKeyboard__keycap_active');
      }
    }
    if (keyName === 'Tab') newKeycap.classList.add('virtualKeyboard__keycap-tab');
    if (keyName === 'Backspace') newKeycap.classList.add('virtualKeyboard__keycap-back');
    if (keyName === 'Space') newKeycap.classList.add('virtualKeyboard__keycap-space');
    if (keyName === 'Enter') newKeycap.classList.add('virtualKeyboard__keycap-enter');
    if (keyName === 'ShiftLeft' || keyName === 'ShiftRight') newKeycap.classList.add('virtualKeyboard__keycap-shift');
    keyboardEl.append(newKeycap);
  }
};

// drowKeys(enKeys);

document.addEventListener('keydown', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.add('virtualKeyboard__keycap_active');
    }
  });

  if (e.code === 'CapsLock') {
    console.log(e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`));
    console.log('tik');
    if (!isCaps) {
      setCapsOn();
    } else {
      setCapsOff();
    }
    // e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.toggle('virtualKeyboard__keycap_active');
  }

  if (e.code === 'Tab') {
    console.log('TAB');
    e.preventDefault();
    textArea.value += '	';
  }

  if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && (e.code !== 'AltLeft' || e.code !== 'AltRight')) {
    console.log(e.target.nextElementSibling);
    console.log(e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`) || e.target.nextElementSibling.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`));
    setShiftOn();
    if (e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`)) {
      e.target.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
    } else {
      e.target.nextElementSibling.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
    }
    console.log('DOWN');
  }
  if (e.code !== 'Backspace' && e.code !== 'Delete' && e.code !== 'CapsLock' && e.code !== 'Enter' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlLeft' && e.code !== 'MetaLeft' && e.code !== 'AltLeft' && e.code !== 'AltRight' && e.code !== 'ControlRight' && e.code !== 'Tab') {
    console.log(e.key);
    textArea.value += e.key;
  }
});
document.addEventListener('keyup', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code && element.dataset.code !== 'CapsLock') {
      console.log(e.code);
      element.classList.remove('virtualKeyboard__keycap_active');

      if (element.dataset.code === 'ShiftLeft' || element.dataset.code === 'ShiftRight') {
        element.classList.remove('virtualKeyboard__keycap_active');
        setShiftOff();
        console.log(element.dataset.code);
      }
    }
  });
});

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
  console.log('DA');
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
    drowKeys(ruKeysCaps);
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
    drowKeys(ruKeysCapsShift);
  }
};

const setLang = function () {
  if (isEng && isCaps) {
    console.log('setLang');
    drowKeys(ruKeysCaps);
  } else if (isEng && !isCaps) {
    console.log('setLang');
    drowKeys(ruKeys);
  } else if (!isEng && isCaps) {
    console.log('setLang');
    drowKeys(enKeysCaps);
  } else if (!isEng && !isCaps) {
    console.log('setLang');
    drowKeys(enKeys);
  }
  isEng = !isEng;
  sessionStorage.setItem('isEng', isEng);
};

drowKeys(enKeys);

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.altKey) {
    // Смена языка
    console.log('!!');
    setLang();
  }
});
