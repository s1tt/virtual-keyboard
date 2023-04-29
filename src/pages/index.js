import Key from '../components/Key.js';
import { enKeys, enKeysCaps } from '../utils/constants.js';

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

let isCaps = false;

const drowKeys = function (keysMap) {
  Array.from(keyboardEl.children).forEach(el => el.remove());
  for (const [keyName, key] of Object.entries(keysMap)) {
    // console.log(`${keyName} : ${keysMap[keyName]}`);
    const keycap = keyTemplate.cloneNode(true);
    const newKeycap = new Key(keyName, key, keycap).generate();
    if (keyName === 'CapsLock') {
      console.log(isCaps);
      if (isCaps) {
        // console.log('add');
        newKeycap.classList.add('virtualKeyboard__keycap_active');
      } else {
        newKeycap.classList.remove('virtualKeyboard__keycap_active');
      }
      newKeycap.classList.add('virtualKeyboard__keycap-caps');
      newKeycap.addEventListener('click', e => {
        isCaps = !isCaps;
        if (isCaps) {
          drowKeys(enKeysCaps);
          // console.log('CAPS');
          // newKeycap.classList.add('virtualKeyboard__keycap_active');
          // isCaps = !isCaps;
        } else {
          drowKeys(enKeys);
          // console.log('NOCAPS');
          // newKeycap.classList.add('virtualKeyboard__keycap_active');
          // isCaps = !isCaps;
        }
      });
    }
    if (keyName === 'Tab') newKeycap.classList.add('virtualKeyboard__keycap-tab');
    if (keyName === 'Backspace') newKeycap.classList.add('virtualKeyboard__keycap-back');
    if (keyName === 'Space') newKeycap.classList.add('virtualKeyboard__keycap-space');
    if (keyName === 'Enter') newKeycap.classList.add('virtualKeyboard__keycap-enter');
    if (keyName === 'ShiftLeft' || keyName === 'ShiftRight') newKeycap.classList.add('virtualKeyboard__keycap-shift');
    // console.log(newKeycap);
    keyboardEl.append(newKeycap);
  }
};

drowKeys(enKeys);

document.addEventListener('keydown', e => {
  console.log(e);
  // if (e.code === this._code) this._keycap.classList.add('virtualKeyboard__keycap_active');
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    // console.log(element.dataset.code);
    if (element.dataset.code === e.code) {
      element.classList.add('virtualKeyboard__keycap_active');
    }
  });
  // const allButtons = keyboardEl.querySelectorAll('.virtualKeyboard__keycap');
  // console.log(allButtons);
  if (e.code !== 'Backspace' && e.code !== 'Delete' && e.code !== 'CapsLock' && e.code !== 'Enter' && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'ControlLeft' && e.code !== 'MetaLeft' && e.code !== 'AltLeft' && e.code !== 'AltRight' && e.code !== 'ControlRight' && e.code !== 'Tab') {
    // console.log(e.code);
    textArea.value += e.key;
  }
});
document.addEventListener('keyup', e => {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.remove('virtualKeyboard__keycap_active');
    }
  });
  // if (e.code === this._code) this._keycap.classList.remove('virtualKeyboard__keycap_active');
});
