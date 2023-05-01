export default class Key {
  constructor(code, key, keycap, printKey) {
    this._code = code;
    this._key = key;
    this._keycap = keycap;
    this._textArea = document.querySelector('.virtualKeyboard__textArea');
    this._printKey = function (event, key) {
      event.preventDefault();
      const start = this._textArea.selectionStart;
      const end = this._textArea.selectionEnd;
      const text = this._textArea.value;
      const newText = text.substring(0, start) + key + text.substring(end);
      this._textArea.value = newText;
      this._textArea.selectionStart = this._textArea.selectionEnd = start + key.toString().length;
    };
    this._handlers = {
      Backspace: e => {
        e.preventDefault();
        const cursorPosition = this._textArea.selectionStart;
        const endPosition = this._textArea.selectionEnd;
        const currentValue = this._textArea.value;
        if (cursorPosition === 0 && endPosition === currentValue.length) {
          this._textArea.value = '';
        } else {
          const updatedValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(endPosition);
          this._textArea.value = updatedValue;
          this._textArea.selectionStart = cursorPosition - 1;
          this._textArea.selectionEnd = cursorPosition - 1;
        }
      },
      Tab: e => {
        this._printKey(e, '    ');
      },
      ControlLeft: e => {
        e.preventDefault();
      },
      ControlRight: e => {
        e.preventDefault();
      },
      AltLeft: e => {
        e.preventDefault();
      },
      AltRight: e => {
        e.preventDefault();
      },
      MetaLeft: e => {
        e.preventDefault();
      },
      Space: e => {
        this._printKey(e, ' ');
      },
      Delete: () => {
        const cursorPosition = this._textArea.selectionStart;
        const currentValue = this._textArea.value;
        const updatedValue = currentValue.slice(0, cursorPosition) + currentValue.slice(cursorPosition + 1);
        this._textArea.value = updatedValue;
        this._textArea.selectionStart = cursorPosition;
        this._textArea.selectionEnd = cursorPosition;
      },
      Enter: e => {
        this._printKey(e, '\n');
      },
      CapsLock: () => {
        this._keycap.classList.toggle('virtualKeyboard__keycap_active');
      },
      ShiftRight: e => {
        e.preventDefault();
      },
      ShiftLeft: e => {
        e.preventDefault();
      },
      default: e => {
        this._printKey(e, this._key);
      }
    };
  }

  generate() {
    this._keycap.querySelector('.virtualKeyboard__keycap-simbol').textContent = this._key;
    this._keycap.addEventListener('mousedown', this._handlers[this._code] || this._handlers.default);
    this._keycap.dataset.code = this._code;

    return this._keycap;
  }
}
