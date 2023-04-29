export default class Key {
  constructor(code, key, keycap) {
    this._code = code;
    this._key = key;
    this._keycap = keycap;
    this._textArea = document.querySelector('.virtualKeyboard__textArea');
    // this.generate = this.generate.bind(this);
  }

  generate() {
    this._keycap.querySelector('.virtualKeyboard__keycap-simbol').textContent = this._key;
    this._keycap.addEventListener('click', e => {
      console.log(this._code);

      if (this._code === 'Backspace') {
        const cursorPosition = this._textArea.selectionStart;
        const currentValue = this._textArea.value;
        const updatedValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
        this._textArea.value = updatedValue;
        this._textArea.selectionStart = cursorPosition - 1;
        this._textArea.selectionEnd = cursorPosition - 1;
      } else if (this._code === 'Tab') {
        this._textArea.value += '	';
      } else if (this._code === 'Delete') {
        const cursorPosition = this._textArea.selectionStart;
        const currentValue = this._textArea.value;
        const updatedValue = currentValue.slice(0, cursorPosition) + currentValue.slice(cursorPosition + 1);
        this._textArea.value = updatedValue;
        this._textArea.selectionStart = cursorPosition;
        this._textArea.selectionEnd = cursorPosition;
      } else if (this._code === 'Enter') {
        this._textArea.value += '\n';
      } else if (this._code === 'CapsLock') {
        this._keycap.classList.toggle('virtualKeyboard__keycap_active');
      } else {
        this._textArea.value += this._key;
      }
    });
    this._keycap.dataset.code = this._code;

    return this._keycap;
  }

  setEventListeners() {}
}
