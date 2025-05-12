class Encuesta {
  constructor(pregunta, opciones) {
    this.pregunta = pregunta;
    this.opciones = opciones.filter(op => op.trim() !== "");
    this.votos = Array(this.opciones.length).fill(0);
  }
//Votar
  votar(opcionIndex) {
    if (opcionIndex >= 0 && opcionIndex < this.votos.length) {
      this.votos[opcionIndex]++;
    }
  }
//Mostrar encuesta
  mostrar(container) {
    const div = document.createElement('div');
    div.innerHTML = `${this.pregunta}`;

    this.opciones.forEach((opcion, index) => {
      const boton = document.createElement('button');
      boton.textContent = opcion;
      boton.onclick = () => {
        this.votar(index);
        this.mostrarResultados(resultadosDiv);
      };
      div.appendChild(boton);
    });

    const resultadosDiv = document.createElement('div');
    div.appendChild(resultadosDiv);
    container.appendChild(div);
  }
//Mostrar resultados
  mostrarResultados(resultadosDiv) {
    resultadosDiv.innerHTML = "<h4>Resultados:</h4>";
    this.opciones.forEach((opcion, index) => {
      resultadosDiv.innerHTML += `${opcion}: ${this.votos[index]} votos<br>`;
    });
  }
}

const encuestas = [];

function renderizarEncuestas() {
  const container = document.getElementById('surveyContainer');
  container.innerHTML = "";
  encuestas.forEach(encuesta => encuesta.mostrar(container));
}

document.getElementById('formularioEncuesta').addEventListener('submit', function (e) {
  e.preventDefault();
  const pregunta = document.getElementById('pregunta').value;
  const opciones = Array.from(document.getElementsByClassName('opcion')).map(input => input.value);
  const nuevaEncuesta = new Encuesta(pregunta, opciones);
  encuestas.push(nuevaEncuesta);
  this.reset();
  renderizarEncuestas();
});