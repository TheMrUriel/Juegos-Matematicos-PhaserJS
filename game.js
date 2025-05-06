const config = {
  type: Phaser.AUTO,
  width: 800,
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
  this.add
    .text(400, 50, "Juego de Sumas", { fontSize: "32px", fill: "#ffffff" })
    .setOrigin(0.5);

  scoreText = this.add
    .text(400, 100, "Puntaje: 0", { fontSize: "24px", fill: "#ffffff" })
    .setOrigin(0.5);
  questionText = this.add
    .text(400, 200, "", { fontSize: "32px", fill: "#ffffff" })
    .setOrigin(0.5);
  feedbackText = this.add
    .text(400, 250, "", { fontSize: "24px", fill: "#ff5555" })
    .setOrigin(0.5);

  inputElement = this.add.dom(400, 320).createFromHTML(`
        <div style="position: relative; display: flex; align-items: center;">
          <input type="number" id="respuesta"
            style="font-size: 28px; padding: 10px 15px; width: 300px;
                   text-align: left; background-color: black; color: #00ff00;
                   font-family: monospace; outline: none;
                   -moz-appearance: textfield; -webkit-appearance: none;">
          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-left: 10px;">
            <button id="up" style="background-color: black; color: #00ff00; font-size: 20px; border: 2px solid #00ff00; padding: 5px; width: 50px;">↑</button>
            <button id="down" style="background-color: black; color: #00ff00; font-size: 20px; border: 2px solid #00ff00; padding: 5px; width: 50px;">↓</button>
          </div>
        </div>
      `);

  // Lógica para los botones
  const upButton = document.getElementById("up");
  const downButton = document.getElementById("down");
  const input = document.getElementById("respuesta");

  // Asegurarnos de que el campo se inicializa correctamente con 0
  input.addEventListener("focus", () => {
    input.value = 0; // Inicializar el valor a 0 al recibir el foco
  });

  // Lógica de los botones
  upButton.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
  });

  downButton.addEventListener("click", () => {
    input.value = parseInt(input.value) - 1;
  });

  // Botón enviar
  const submitBtn = this.add
    .text(400, 400, "Enviar", {
      fontSize: "28px",
      fill: "#fff",
      backgroundColor: "#000",
      padding: { x: 20, y: 10 },
    })
    .setOrigin(0.5)
    .setInteractive();

  // Función para validar respuesta
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

  // Click al botón
  submitBtn.on("pointerdown", verificarRespuesta);

  // Enter en el input
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
