export const body = document.querySelector('body');

// Create 'header' element and add to 'body'
export const header = document.createElement('header');
header.classList.add('header', 'center');
body.append(header);

// Create 'h1' element and add to 'header'
export const mainTitle = document.createElement('h1');
mainTitle.textContent = 'RSS Virtual Keyboard';
mainTitle.className = 'header__title';
header.append(mainTitle);

// Create 'main' element and add to 'body'
export const main = document.createElement('main');
main.classList.add('content', 'center');
body.append(main);

// Create 'section' element and add to 'main'
export const virtualKeyboardSection = document.createElement('section');
virtualKeyboardSection.className = 'virtualKeyboard';
main.append(virtualKeyboardSection);

// Create 'textArea' element and add to 'section'
export const textArea = document.createElement('textarea');
textArea.className = 'virtualKeyboard__textArea';
virtualKeyboardSection.append(textArea);

//
export const keyboardEl = document.createElement('div');
keyboardEl.className = 'virtualKeyboard__keyboard';
virtualKeyboardSection.append(keyboardEl);

export const keyTemplate = document.createElement('div');
keyTemplate.className = 'virtualKeyboard__keycap';
export const keySimbol = document.createElement('span');
keySimbol.className = 'virtualKeyboard__keycap-simbol';
keyTemplate.append(keySimbol);

export const oprationSystem = document.createElement('p');
oprationSystem.className = 'virtualKeyboard__description';
oprationSystem.textContent = 'Keyboard created in the Windows operating system';
virtualKeyboardSection.append(oprationSystem);

export const commandForChangeLang = document.createElement('p');
commandForChangeLang.className = 'virtualKeyboard__description';
commandForChangeLang.textContent = 'To switch the language combination: Ctrl + Alt';
virtualKeyboardSection.append(commandForChangeLang);
