
const keyLayout = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "ENG", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
  "done", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
  "space", "", "voice", "<", ">"
];
const keyLayoutRu = [
  "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "РУС", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
  "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
  "done", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
  "space", "", "voice", "<", ">"
];

const keyLayoutshift = [
  "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
  "ENG", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "|", "enter",
  "done", "Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
  "space", "", "voice", "<", ">"
];
const keyLayoutRushift = [
  "ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
  "РУС", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
  "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "/", "enter",
  "done", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
  "space", "", "voice", "<", ">"
];
const eventcode = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'ShiftLeft + AltLeft', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter',
  'qqqqqq', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
  'Space', '', "voice", 'ArrowLeft', 'ArrowRight'
];
let recognitionon = false;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = new SpeechRecognition();
rec.lang = 'en-US';

const textArea = document.getElementById('mytextarea');
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  sound: true,
  english: true,
  curentCursor: 0,

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();


    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };
    let a = 0;
    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "/"].indexOf(key) !== -1;

      // Add attributes/classes

      keyElement.setAttribute("type", "button");
      keyElement.id = "i" + a;
      a++;
      keyElement.classList.add("keyboard__key");


      keyElement.addEventListener("click", () => {
        textArea.focus();
      });

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/backspen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/backsp.mp3");
                audio.play();
              }
            };
            if (this.curentCursor > 0) {
              this.properties.value = this.properties.value.toString().slice(0, this.curentCursor - 1) + this.properties.value.toString().slice(this.curentCursor);
              this._triggerEvent("oninput");
              textArea.focus();
              this.curentCursor--;
              textArea.selectionStart = this.curentCursor;
              textArea.selectionEnd = this.curentCursor;
            } else return;
          });
          break;

        case "":
          keyElement.style.backgroundImage = "url('assets/audio.png')";
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            this.sound = !this.sound;
            if (this.sound) {
              keyElement.style.backgroundImage = "url('assets/audio.png')";
            } else {
              keyElement.style.backgroundImage = "url('assets/mute.png')";
            }
          });
          break;

        case "Shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = key;

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/shift.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/shiften.mp3");
                audio.play();
              }
            };
            this._shift();
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active");
          });
          break;

        case "ENG":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = key;
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            this._lang();
          });
          break;

        case "voice":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = key;
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };

            if (this.english) {
              rec.lang = 'en-US';
            } else {
              rec.lang = 'ru';
            }
            recognitionon = !recognitionon;
            if (recognitionon) {
              keyElement.classList.add("keyboard__key--active");
              rec.start();
            } else {
              keyElement.classList.remove("keyboard__key--active");
              rec.stop();
            }

          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/caps.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/capsen.mp3");
                audio.play();
              }
            };
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active");
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/enter.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/enteren.mp3");
                audio.play();
              }
            };
            this.properties.value = this.properties.value.toString().slice(0, this.curentCursor) + "\n" + this.properties.value.toString().slice(this.curentCursor);
            this._triggerEvent("oninput");
            textArea.focus();
            this.curentCursor++;
            textArea.selectionStart = this.curentCursor;
            textArea.selectionEnd = this.curentCursor;
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            this.properties.value = this.properties.value.toString().slice(0, this.curentCursor) + " " + this.properties.value.toString().slice(this.curentCursor);
            this._triggerEvent("oninput");
            textArea.focus();
            this.curentCursor++;
            textArea.selectionStart = this.curentCursor;
            textArea.selectionEnd = this.curentCursor;

          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            this.close();
            this._triggerEvent("onclose");
          });
          break;

        case "<":
          keyElement.innerHTML = key;
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            if (this.curentCursor > 0) {
              textArea.selectionStart = this.curentCursor - 1;
              textArea.selectionEnd = this.curentCursor - 1;
              this.curentCursor = this.curentCursor - 1;
              textArea.focus();
            } else return;
          });
          break;

        case ">":
          keyElement.innerHTML = key;
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            if (this.curentCursor < this.properties.value.length) {
              textArea.selectionStart = this.curentCursor + 1;
              textArea.selectionEnd = this.curentCursor + 1;
              this.curentCursor = this.curentCursor + 1;
              textArea.focus();
            } else return;
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            if (this.sound) {
              if (this.english) {
                let audio = new Audio("assets/keyen.mp3");
                audio.play();
              } else {
                let audio = new Audio("assets/keyru.mp3");
                audio.play();
              }
            };
            this.properties.value = this.properties.value.toString().slice(0, this.curentCursor) + keyElement.textContent + this.properties.value.toString().slice(this.curentCursor);
            this._triggerEvent("oninput");
            textArea.focus();
            this.curentCursor++;
            textArea.selectionStart = this.curentCursor;
            textArea.selectionEnd = this.curentCursor;
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }

  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && key.innerHTML !== "Shift" && key.innerHTML !== "ENG" && key.innerHTML !== "РУС" && key.innerHTML !== "voice") {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  shift: false,
  _shift() {
    this.shift = !this.shift;
    let i = 0;
    for (const key of this.elements.keys) {
      if (key.childElementCount !== 0) {
        i++;
        continue;
      }
      if (this.shift && this.english) {
        key.textContent = keyLayoutshift[i];
        i++;
      }
      if (!this.shift && this.english) {
        key.textContent = keyLayout[i];
        i++;
      }
      if (this.shift && !this.english) {
        key.textContent = keyLayoutRushift[i];
        i++;
      }
      if (!this.shift && !this.english) {
        key.textContent = keyLayoutRu[i];
        i++;
      }
    }
  },

  _lang() {
    this.english = !this.english;

    if (!this.english) {
      let i = 0;
      for (let el of document.querySelectorAll(".keyboard__key")) {
        if (el.childElementCount !== 0) {
          i++;
          continue;
        }
        el.innerHTML = keyLayoutRu[i];
        i++;
      }
    } else {
      let i = 0;
      for (let el of document.querySelectorAll(".keyboard__key")) {
        if (el.childElementCount !== 0) {
          i++;
          continue;
        }
        el.innerHTML = keyLayout[i];
        i++;
      }
    };
    if (this.shift) {
      this.shift = !this.shift;
      this._shift();
    }
    if (this.properties.capsLock) {
      this.properties.capsLock = !this.properties.capsLock;
      this._toggleCapsLock();
    }

  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
    textArea.blur();
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});


document.addEventListener('keydown', function (event) {
  let elementskeys = document.querySelectorAll(".keyboard__key");
  let el = elementskeys[eventcode.indexOf(event.code)];
  if (el) {
    if (el.id !== "i54") {
      el.style.background = 'orange';
    }
  }
  if (event.code === "CapsLock") {
    el.classList.toggle("keyboard__key--active");
    Keyboard._toggleCapsLock();
  } else if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    // document.getElementById('i42').classList.toggle("keyboard__key--active");
    // Keyboard._shift();
    // Keyboard._toggleCapsLock();
  } else if (event.code === "Enter" || event.code === "NumpadEnter") {
    document.getElementById("i40").style.background = "orange";
    event.preventDefault();
    Keyboard.properties.value = Keyboard.properties.value.toString().slice(0, Keyboard.curentCursor) + "\n" + Keyboard.properties.value.toString().slice(Keyboard.curentCursor);
    Keyboard._triggerEvent("oninput");
    textArea.focus();
    Keyboard.curentCursor++;
    textArea.selectionStart = Keyboard.curentCursor;
    textArea.selectionEnd = Keyboard.curentCursor;
  } else if (event.code === "Backspace") {
    event.preventDefault();
    if (Keyboard.curentCursor > 0) {
      Keyboard.properties.value = Keyboard.properties.value.toString().slice(0, Keyboard.curentCursor - 1) + Keyboard.properties.value.toString().slice(Keyboard.curentCursor);
      Keyboard._triggerEvent("oninput");
      textArea.focus();
      Keyboard.curentCursor--;
      textArea.selectionStart = Keyboard.curentCursor;
      textArea.selectionEnd = Keyboard.curentCursor;
    } else return;
  } else if (event.code === "Space") {
    event.preventDefault();
    Keyboard.properties.value = Keyboard.properties.value.toString().slice(0, Keyboard.curentCursor) + " " + Keyboard.properties.value.toString().slice(Keyboard.curentCursor);
    Keyboard._triggerEvent("oninput");
    textArea.focus();
    Keyboard.curentCursor++;
    textArea.selectionStart = Keyboard.curentCursor;
    textArea.selectionEnd = Keyboard.curentCursor;
  } else if (event.code === "ArrowLeft") {
    // event.preventDefault();
    if (Keyboard.curentCursor > 0) {
      // textArea.selectionStart = Keyboard.curentCursor - 1;
      // textArea.selectionEnd = Keyboard.curentCursor - 1;
      Keyboard.curentCursor = Keyboard.curentCursor - 1;
      // textArea.focus();
    } else return;
  } else if (event.code === "ArrowRight") {
    // event.preventDefault();
    if (Keyboard.curentCursor < Keyboard.properties.value.length) {
      // textArea.selectionStart = Keyboard.curentCursor + 1;
      // textArea.selectionEnd = Keyboard.curentCursor + 1;
      Keyboard.curentCursor = Keyboard.curentCursor + 1;
      // textArea.focus();
    } else return;

  } else if (el) {
    if (el.id !== "i14" && el.id !== "i41" && el.id !== "i54" && el.id !== "i55") {
      event.preventDefault();
      Keyboard.properties.value = Keyboard.properties.value.toString().slice(0, Keyboard.curentCursor) + el.textContent + Keyboard.properties.value.toString().slice(Keyboard.curentCursor);
      Keyboard._triggerEvent("oninput");
      textArea.focus();
      Keyboard.curentCursor++;
      textArea.selectionStart = Keyboard.curentCursor;
      textArea.selectionEnd = Keyboard.curentCursor;
    }
  }
});

document.addEventListener('keyup', function (event) {
  let elementskeys = document.querySelectorAll(".keyboard__key");
  for (let el of elementskeys) {
    if (el.id == "i54") {
      continue;
    }
    el.style.background = "";

  }
});

rec.addEventListener("result", e => {
  let text = "";
  text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  Keyboard.properties.value = Keyboard.properties.value.toString().slice(0, Keyboard.curentCursor) + text + Keyboard.properties.value.toString().slice(Keyboard.curentCursor);
  Keyboard.curentCursor += text.length;
  Keyboard._triggerEvent("oninput");
  textArea.focus();
  textArea.selectionStart = Keyboard.curentCursor;
  textArea.selectionEnd = Keyboard.curentCursor;
});

rec.addEventListener('end', () => {
  if (recognitionon) {
    rec.start();
  }
});