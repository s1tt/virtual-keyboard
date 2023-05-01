import Key from '../components/Key.js';
import { enKeys, enKeysCaps, ruKeys, ruKeysCaps, enKeysShift, enKeysCapsShift, ruKeysShift, ruKeysCapsShift, keysCode } from '../utils/constants.js';
import { textArea, keyboardEl, keyTemplate, body } from '../utils/elements.js';

const setValueToSessionStore = function (variable, value) {
  sessionStorage.setItem(variable, value);
};

const getValueFromSessionStore = function (variable) {
  return sessionStorage.getItem(variable) === 'true';
};

//установка значений по умолчанию, если нет таких переменных в хранилище
const setStartingValuesToSessionStorage = function () {
  if (getValueFromSessionStore('isCaps') === 'undefined') {
    setValueToSessionStore('isCaps', false);
  } else if (getValueFromSessionStore('isShift') === 'undefined') {
    setValueToSessionStore('isShift', false);
  } else if (getValueFromSessionStore('isEng') === 'undefined') {
    setValueToSessionStore('isEng', true);
  }
};

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
  sessionStorage.setItem('isCaps', true);
  if (getValueFromSessionStore('isEng')) {
    drowKeys(enKeysCaps);
  } else {
    drowKeys(ruKeysCaps);
  }
};

const setCapsOff = function () {
  sessionStorage.setItem('isCaps', false);
  if (getValueFromSessionStore('isEng')) {
    drowKeys(enKeys);
  } else {
    drowKeys(ruKeys);
  }
};

const setShiftOn = function () {
  sessionStorage.setItem('isShift', true);
  if (getValueFromSessionStore('isCaps') && getValueFromSessionStore('isEng')) {
    drowKeys(enKeysCapsShift);
  } else if (!getValueFromSessionStore('isCaps') && getValueFromSessionStore('isEng')) {
    drowKeys(enKeysShift);
  } else if (getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isEng')) {
    drowKeys(ruKeysCapsShift);
  } else if (!getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isEng')) {
    drowKeys(ruKeysShift);
  }
};

const setShiftOff = function () {
  sessionStorage.setItem('isShift', false);
  if (getValueFromSessionStore('isCaps') && getValueFromSessionStore('isEng')) {
    drowKeys(enKeysCaps);
  } else if (!getValueFromSessionStore('isCaps') && getValueFromSessionStore('isEng')) {
    drowKeys(enKeys);
  } else if (getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isEng')) {
    drowKeys(ruKeysCaps);
  } else if (!getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isEng')) {
    drowKeys(ruKeys);
  }
};

const setLang = function () {
  setStartingValuesToSessionStorage();
  if (getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps')) {
    drowKeys(enKeysCaps);
  } else if (getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps')) {
    drowKeys(enKeys);
  } else if (!getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps')) {
    drowKeys(ruKeysCaps);
  } else if (!getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps')) {
    drowKeys(ruKeys);
  }
};

const changeLang = function () {
  sessionStorage.setItem('isEng', !getValueFromSessionStore('isEng'));
  setLang();
};

const addKeyClass = (keyName, newKeycap) => {
  switch (keyName) {
    case 'CapsLock':
      newKeycap.classList.add('virtualKeyboard__keycap-caps');
      if (getValueFromSessionStore('isCaps')) {
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

const printKey = function (event, keyCode) {
  event.preventDefault();
  keysCode.forEach(code => {
    if (code === event.code) {
      let key;

      switch (keyCode) {
        case 'Space': {
          key = ' ';
          break;
        }
        case 'Tab': {
          key = '    ';
          break;
        }
        case 'Enter': {
          key = '\n';
          break;
        }
        default: {
          //en
          if (getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isShift')) {
            key = enKeysCaps[keyCode];
          } else if (getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isShift')) {
            key = enKeys[keyCode];
          } else if (getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps') && getValueFromSessionStore('isShift')) {
            key = enKeysCapsShift[keyCode];
          } else if (getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps') && getValueFromSessionStore('isShift')) {
            key = enKeysShift[keyCode];
          }
          //rus
          else if (!getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isShift')) {
            key = ruKeysCaps[keyCode];
          } else if (!getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps') && !getValueFromSessionStore('isShift')) {
            key = ruKeys[keyCode];
          } else if (!getValueFromSessionStore('isEng') && getValueFromSessionStore('isCaps') && getValueFromSessionStore('isShift')) {
            key = ruKeysCapsShift[keyCode];
          } else if (!getValueFromSessionStore('isEng') && !getValueFromSessionStore('isCaps') && getValueFromSessionStore('isShift')) {
            key = ruKeysShift[keyCode];
          }
        }
      }
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const text = textArea.value;
      const newText = text.substring(0, start) + key + text.substring(end);
      textArea.value = newText;
      textArea.selectionStart = textArea.selectionEnd = start + key.toString().length;
    }
  });
};

const hendleKeyDown = function (e) {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code) {
      element.classList.add('virtualKeyboard__keycap_active');
    }
  });

  switch (e.code) {
    case 'CapsLock': {
      if (!getValueFromSessionStore('isCaps')) {
        setCapsOn();
      } else {
        setCapsOff();
      }
      break;
    }
    case 'Space': {
      printKey(e, e.code);
      break;
    }
    case 'Tab': {
      printKey(e, e.code);
      break;
    }
    case 'Backspace': {
      const cursorPosition = textArea.selectionStart;
      const endPosition = textArea.selectionEnd;
      const currentValue = textArea.value;
      if (cursorPosition === 0 && endPosition === currentValue.length) {
        textArea.value = '';
      } else {
        const updatedValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(endPosition);
        textArea.value = updatedValue;
        textArea.selectionStart = cursorPosition - 1;
        textArea.selectionEnd = cursorPosition - 1;
      }
      break;
    }
    case 'Delete': {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      if (start === end) {
        // если ничего не выделено, удаляем один символ после курсора
        const currentValue = textArea.value;
        const updatedValue = currentValue.slice(0, start) + currentValue.slice(start + 1);
        textArea.value = updatedValue;
        textArea.selectionStart = start;
        textArea.selectionEnd = start;
      } else {
        // если выделен текст, удаляем его
        const text = textArea.value;
        const newText = text.substring(0, start) + text.substring(end);
        textArea.value = newText;
        textArea.selectionStart = textArea.selectionEnd = start;
      }
      break;
    }
    case 'Enter': {
      printKey(e, e.code);
      break;
    }
    case 'AltLeft': {
      e.preventDefault();
      break;
    }
    case 'AltRight': {
      e.preventDefault();
      break;
    }
    case 'ControlRight': {
      e.preventDefault();
      break;
    }
    case 'ControlLeft': {
      e.preventDefault();
      break;
    }
    case 'ShiftLeft': {
      e.preventDefault();
      setShiftOn();
      body.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
      break;
    }
    case 'ShiftRight': {
      e.preventDefault();
      setShiftOn();
      body.querySelector(`.virtualKeyboard__keycap[data-code="${e.code}"]`).classList.add('virtualKeyboard__keycap_active');
      break;
    }
    case 'ArrowLeft': {
      printKey(e, e.code);
      break;
    }
    case 'ArrowRight': {
      printKey(e, e.code);
      break;
    }
    case 'ArrowUp': {
      printKey(e, e.code);
      break;
    }
    case 'ArrowDown': {
      printKey(e, e.code);
      break;
    }
    case 'MetaLeft': {
      e.preventDefault();
      break;
    }
    default: {
      printKey(e, e.code);
      break;
    }
  }
};

const hendleKeyUp = function (e) {
  keyboardEl.querySelectorAll('.virtualKeyboard__keycap').forEach(element => {
    if (element.dataset.code === e.code && element.dataset.code !== 'CapsLock') {
      element.classList.remove('virtualKeyboard__keycap_active');

      if (element.dataset.code === 'ShiftLeft' || element.dataset.code === 'ShiftRight') {
        element.classList.remove('virtualKeyboard__keycap_active');
        setShiftOff();
      }
    }
  });
};

const hendleChangeLang = function (e) {
  if (e.ctrlKey && e.altKey) {
    changeLang();
  }
};

setLang();

document.addEventListener('keydown', hendleChangeLang);

document.addEventListener('keydown', hendleKeyDown);

document.addEventListener('keyup', hendleKeyUp);

textArea.addEventListener('keydown', e => e.preventDefault());
