export default class Key {
  constructor(code, key, keycap) {
    this._code = code;
    this._key = key;
    this._keycap = keycap;
    this._textArea = document.querySelector('.virtualKeyboard__textArea');
    this._handlers = {
      Backspace: () => {
        const cursorPosition = this._textArea.selectionStart;
        const currentValue = this._textArea.value;
        const updatedValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
        this._textArea.value = updatedValue;
        this._textArea.selectionStart = cursorPosition - 1;
        this._textArea.selectionEnd = cursorPosition - 1;
      },
      Tab: e => {
        e.preventDefault();
        const start = this._textArea.selectionStart;
        const end = this._textArea.selectionEnd;
        const text = this._textArea.value;
        const newText = text.substring(0, start) + '	' + text.substring(end);
        this._textArea.value = newText;
        this._textArea.selectionStart = this._textArea.selectionEnd = start + 1;
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
        e.preventDefault();
        const start = this._textArea.selectionStart;
        const end = this._textArea.selectionEnd;
        const text = this._textArea.value;
        const newText = text.substring(0, start) + ' ' + text.substring(end);
        this._textArea.value = newText;
        this._textArea.selectionStart = this._textArea.selectionEnd = start + 1;
      },
      Delete: () => {
        const cursorPosition = this._textArea.selectionStart;
        const currentValue = this._textArea.value;
        const updatedValue = currentValue.slice(0, cursorPosition) + currentValue.slice(cursorPosition + 1);
        this._textArea.value = updatedValue;
        this._textArea.selectionStart = cursorPosition;
        this._textArea.selectionEnd = cursorPosition;
      },
      Enter: () => {
        this._textArea.value += '\n';
      },
      CapsLock: () => {
        this._keycap.classList.toggle('virtualKeyboard__keycap_active');
      },
      default: () => {
        this._textArea.value += this._key;
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
