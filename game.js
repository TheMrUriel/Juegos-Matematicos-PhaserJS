const isPhone = window.innerWidth < 768;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: 600,
  backgroundColor: "#2d2d2d",
  parent: "game-container",
  dom: {
    createContainer: true,
  },
  scene: {
    preload,
    create,
  },
};

let questionText, scoreText, inputElement, feedbackText;
let score = 0;
let num1, num2, correctAnswer;

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const centerX = this.scale.width / 2;
  const centerY = this.scale.height / 2;

  const textScale = isPhone ? 1.5 : 1;
  const inputScale = isPhone ? 1.4 : 1;
  const buttonScale = isPhone ? 1.3 : 1;

  this.add
    .text(centerX, centerY - 250, "Juego de Sumas", {
      fontSize: `${32 * textScale}px`,
      fill: "#ffffff",
    })
    .setOrigin(0.5);

  scoreText = this.add
    .text(centerX, centerY - 200, "Puntaje: 0", {
      fontSize: `${24 * textScale}px`,
      fill: "#ffffff",
    })
    .setOrigin(0.5);

  questionText = this.add
    .text(centerX, centerY - 100, "", {
      fontSize: `${32 * textScale}px`,
      fill: "#ffffff",
    })
    .setOrigin(0.5);

  feedbackText = this.add
    .text(centerX, centerY - 50, "", {
      fontSize: `${24 * textScale}px`,
      fill: "#ff5555",
    })
    .setOrigin(0.5);

  inputElement = this.add.dom(centerX, centerY + 20).createFromHTML(`
    <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
      <input type="number" id="respuesta"
        style="font-size: ${28 * inputScale}px; padding: 10px 15px; width: ${
    300 * inputScale
  }px;
               text-align: left; background-color: black; color: #00ff00;
               font-family: monospace; outline: none;
               -moz-appearance: textfield; -webkit-appearance: none;">
      <div style="display: flex; flex-direction: column; margin-left: 10px;">
        <button id="up" style="background-color: black; color: #00ff00; font-size: ${
          20 * buttonScale
        }px; border: 2px solid #00ff00; padding: 5px;">↑</button>
        <button id="down" style="background-color: black; color: #00ff00; font-size: ${
          20 * buttonScale
        }px; border: 2px solid #00ff00; padding: 5px;">↓</button>
      </div>
    </div>
  `);

  const upButton = document.getElementById("up");
  const downButton = document.getElementById("down");
  const input = document.getElementById("respuesta");

  input.addEventListener("focus", () => {
    input.value = 0;
  });

  upButton.addEventListener("click", () => {
    input.value = parseInt(input.value || "0") + 1;
  });

  downButton.addEventListener("click", () => {
    input.value = parseInt(input.value || "0") - 1;
  });

  const submitBtn = this.add
    .text(centerX, centerY + 100, "Enviar", {
      fontSize: `${28 * textScale}px`,
      fill: "#fff",
      backgroundColor: "#000",
      padding: { x: 20, y: 10 },
    })
    .setOrigin(0.5)
    .setInteractive();

  const verificarRespuesta = () => {
    const userInput = parseInt(document.getElementById("respuesta").value);
    if (userInput === correctAnswer) {
      score++;
      feedbackText.setText("¡Correcto!");
    } else {
      score = 0;
      feedbackText.setText("Incorrecto. ¡Intenta otra vez!");
    }
    scoreText.setText("Puntaje: " + score);
    nextQuestion();
  };

  submitBtn.on("pointerdown", verificarRespuesta);

  document
    .getElementById("respuesta")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        verificarRespuesta();
      }
    });

  nextQuestion();
}

function nextQuestion() {
  num1 = Phaser.Math.Between(1, 10);
  num2 = Phaser.Math.Between(1, 10);
  correctAnswer = num1 + num2;
  questionText.setText(`${num1} + ${num2} = ?`);
  document.getElementById("respuesta").value = "";
  document.getElementById("respuesta").focus();
}
