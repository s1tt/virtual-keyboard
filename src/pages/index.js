import Key from '../components/Key.js';
import { enKeys, enKeysCaps, ruKeys, ruKeysCaps } from '../utils/constants.js';

let isCaps = sessionStorage.getItem('isCaps') === 'true' || false;
let isEng = sessionStorage.getItem('isEng') === 'false' || false;

const body = document.querySelector('body');

// Create 'header' element and add to 'body'
const header = document.createElement('header');
header.classList.add('header', 'center');
body.append(header);

// Create 'h1' element and add to 'header'
const mainTitle = document.createElement('h1');
mainTitle.textContent = 'RSS Virtual Keyboard';
mainTitle.className = 'header__title';
header.append(mainTitle);

// Create 'main' element and add to 'body'
const main = document.createElement('main');
main.classList.add('content', 'center');
body.append(main);

// Create 'section' element and add to 'main'
const virtualKeyboardSection = document.createElement('section');
virtualKeyboardSection.className = 'virtualKeyboard';
main.append(virtualKeyboardSection);

// Create 'textArea' element and add to 'section'
const textArea = document.createElement('textarea');
textArea.className = 'virtualKeyboard__textArea';
virtualKeyboardSection.append(textArea);

//
const keyboardEl = document.createElement('div');
keyboardEl.className = 'virtualKeyboard__keyboard';
virtualKeyboardSection.append(keyboardEl);

const keyTemplate = document.createElement('div');
keyTemplate.className = 'virtualKeyboard__keycap';
const keySimbol = document.createElement('span');
keySimbol.className = 'virtualKeyboard__keycap-simbol';
keyTemplate.append(keySimbol);

const oprationSystem = document.createElement('p');
oprationSystem.className = 'virtualKeyboard__description';
oprationSystem.textContent = 'Keyboard created in the Windows operating system';
virtualKeyboardSection.append(oprationSystem);

const commandForChangeLang = document.createElement('p');
commandForChangeLang.className = 'virtualKeyboard__description';
commandForChangeLang.textContent = 'To switch the language combination: left shift + alt';
virtualKeyboardSection.append(commandForChangeLang);

const drowKeys = function (keysMap) {
  Array.from(keyboardEl.children).forEach(el => el.remove());
  for (const [keyName, key] of Object.entries(keysMap)) {
    const keycap = keyTemplate.cloneNode(true);
    const newKeycap = new Key(keyName, key, keycap).generate();
    if (keyName === 'CapsLock') {
      newKeycap.classList.add('virtualKeyboard__keycap-caps');
      // подсветка кнопки капс
      if (isCaps) {
        newKeycap.classList.add('virtualKeyboard__keycap_active');
      } else {
        newKeycap.classList.remove('virtualKeyboard__keycap_active');
      }
      // Капс ли?
      newKeycap.addEventListener('click', e => {
        isCaps = !isCaps;
        sessionStorage.setItem('isCaps', isCaps);
        if (isCaps) {
          drowKeys(enKeysCaps);
        } else {
          drowKeys(enKeys);
        }
      });
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
  console.log(e);
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.add('virtualKeyboard__keycap_active');
    }
  });
  if (e.code !== 'Backspace' && e.code !== 'Delete' && e.code !== 'CapsLock' && e.code !== 'Enter' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlLeft' && e.code !== 'MetaLeft' && e.code !== 'AltLeft' && e.code !== 'AltRight' && e.code !== 'ControlRight' && e.code !== 'Tab') {
    textArea.value += e.key;
  }
});
document.addEventListener('keyup', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.remove('virtualKeyboard__keycap_active');
    }
  });
});

const setLang = function () {
  if (isCaps && isEng) {
    isEng = !isEng;
    drowKeys(ruKeysCaps);
    sessionStorage.setItem('isEng', isEng);
  } else if (!isCaps && isEng) {
    isEng = !isEng;
    drowKeys(ruKeys);
    sessionStorage.setItem('isEng', isEng);
  } else if (isCaps && !isEng) {
    isEng = !isEng;
    drowKeys(enKeysCaps);
    sessionStorage.setItem('isEng', isEng);
  } else if (!isCaps && !isEng) {
    isEng = !isEng;
    drowKeys(enKeys);
    sessionStorage.setItem('isEng', isEng);
  }
};

setLang();

document.addEventListener('keydown', event => {
  if ((event.code === 'AltLeft' && event.shiftKey) || (event.shiftKey && event.altKey)) {
    // Смена языка
    setLang();
  }
});
