export default class Key {
  constructor(code, key, keycap) {
    this._code = code;
    this._key = key;
    this._keycap = keycap;
    this._textArea = document.querySelector('.virtualKeyboard__textArea');
  }

  generate() {
    this._keycap.querySelector('.virtualKeyboard__keycap-simbol').textContent = this._key;
    this._keycap.addEventListener('click', e => {
      switch (this._code) {
        case 'Backspace': {
          const cursorPosition = this._textArea.selectionStart;
          const currentValue = this._textArea.value;
          const updatedValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
          this._textArea.value = updatedValue;
          this._textArea.selectionStart = cursorPosition - 1;
          this._textArea.selectionEnd = cursorPosition - 1;
          break;
        }
        case 'Tab': {
          console.log('TAB');
          e.preventDefault();
          this._textArea.value += '	';
          break;
        }
        case 'ControlLeft': {
          console.log('leftCtrl');
          e.preventDefault();
          break;
        }
        case 'ControlRight': {
          console.log('ControlRight');
          e.preventDefault();
          break;
        }
        case 'AltLeft': {
          console.log('AltLeft');
          e.preventDefault();
          break;
        }
        case 'AltRight': {
          console.log('AltRight');
          e.preventDefault();
          break;
        }
        case 'MetaLeft': {
          console.log('MetaLeft');
          e.preventDefault();
          break;
        }
        case 'Space': {
          console.log('Space');
          e.preventDefault();
          this._textArea.value += ' ';
          break;
        }
        case 'Delete': {
          const cursorPosition = this._textArea.selectionStart;
          const currentValue = this._textArea.value;
          const updatedValue = currentValue.slice(0, cursorPosition) + currentValue.slice(cursorPosition + 1);
          this._textArea.value = updatedValue;
          this._textArea.selectionStart = cursorPosition;
          this._textArea.selectionEnd = cursorPosition;
          break;
        }
        case 'Enter': {
          this._textArea.value += '\n';
          break;
        }
        case 'CapsLock': {
          this._keycap.classList.toggle('virtualKeyboard__keycap_active');
          break;
        }
        default: {
          this._textArea.value += this._key;
        }
      }
    });
    this._keycap.dataset.code = this._code;

    return this._keycap;
  }

  setEventListeners() {}
}
