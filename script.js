const preguntas = [
  {
    texto: "¿Qué etiqueta se usa para un formulario HTML?",
    opciones: ["<input>", "<div>", "<form>", "<fieldset>"],
    correcta: 2,
    feedback: "La etiqueta <form> se usa para definir un formulario en HTML."
  },
  {
    texto: "¿Qué atributo vincula un <label> con un input?",
    opciones: ["ref", "target", "for", "bind"],
    correcta: 2,
    feedback: "El atributo 'for' asocia un label con el id de un input."
  },
  {
    texto: "Complete: <title>___________</title> y ___________",
    opciones: ["documento, <body>", "index, <footer>", "Página, <div>", "documento, <h1>"],
    correcta: 0,
    feedback: "La estructura mínima incluye <title> y <body>."
  },
  {
    texto: "V/F: <h1> a <h6> crean tablas en HTML",
    opciones: ["Verdadero", "Falso"],
    correcta: 1,
    feedback: "Falso. Las etiquetas <h1> a <h6> son títulos, no tablas."
  },
  {
    texto: "¿Cómo se aplica fondo rojo a un ID?",
    opciones: [
      "#principal { background-color: red; }",
      ".principal { background-color: red; }",
      "principal { color: red; }",
      "*principal { background-color: red; }"
    ],
    correcta: 0,
    feedback: "# se usa para seleccionar elementos por ID en CSS."
  },
  {
    texto: "Propiedad CSS para cambiar fuente:",
    opciones: ["font-weight", "font-size", "font-family", "text-type"],
    correcta: 2,
    feedback: "font-family cambia el tipo de letra."
  },
  {
    texto: "¿Cómo centrar un div con margin?",
    opciones: [
      "margin: center;",
      "margin-left: auto; margin-right: auto;",
      "text-align: center;",
      "float: center;"
    ],
    correcta: 1,
    feedback: "Centrado horizontal con auto en márgenes izquierdo y derecho."
  },
  {
    texto: "V/F: CSS puede incluirse con <link>",
    opciones: ["Verdadero", "Falso"],
    correcta: 0,
    feedback: "Verdadero. Se usa <link rel='stylesheet'> para enlazar CSS externo."
  },
  {
    texto: "Función válida en JavaScript:",
    opciones: [
      "function: saludo() {}",
      "func saludo() {}",
      "function saludo() {}",
      "define saludo() {}"
    ],
    correcta: 2,
    feedback: "La forma correcta es: function saludo() {}"
  },
  {
    texto: "Resultado de `5 == '5'`",
    opciones: ["true", "false", "error", "asigna 5 a y"],
    correcta: 0,
    feedback: "== compara valores sin tipo. Retorna true."
  },
  {
    texto: "Completa para evento click:",
    opciones: ["click", "hover", "submit", "change"],
    correcta: 0,
    feedback: "El evento click se usa para manejar clics."
  },
  {
    texto: "V/F: console.log() se usa para depuración.",
    opciones: ["Verdadero", "Falso"],
    correcta: 0,
    feedback: "Verdadero. Se usa para imprimir en la consola."
  },
  {
    texto: "¿Qué representa el DOM?",
    opciones: [
      "Lenguaje",
      "Base de datos",
      "Representación del documento como objetos",
      "Librería externa"
    ],
    correcta: 2,
    feedback: "DOM representa el documento HTML como nodos accesibles por JS."
  },
  {
    texto: "Cambiar texto con id 'titulo':",
    opciones: [
      "document.html.titulo.innerText",
      "titulo.text",
      "document.getElementById('titulo').innerText",
      "document.title"
    ],
    correcta: 2,
    feedback: "Se usa getElementById para modificar contenido."
  },
  {
    texto: "Resultado del innerHTML:",
    opciones: [
      "Crea un elemento",
      "Cambia color",
      "Cambia contenido",
      "Borra elemento"
    ],
    correcta: 2,
    feedback: "innerHTML cambia el contenido interno del elemento."
  },
  {
    texto: "V/F: El DOM permite modificar elementos dinámicamente.",
    opciones: ["Verdadero", "Falso"],
    correcta: 0,
    feedback: "Verdadero. Es uno de los objetivos del DOM."
  },
  {
    texto: "¿Para qué se usa localStorage?",
    opciones: [
      "Guardar en la nube",
      "Memoria del servidor",
      "Datos en el navegador",
      "Imprimir en consola"
    ],
    correcta: 2,
    feedback: "localStorage guarda datos en el navegador."
  },
  {
    texto: "Guardar 'Ana' en localStorage:",
    opciones: [
      "localStorage.write",
      "localStorage.nombre = 'Ana'",
      "localStorage.setItem('nombre', 'Ana')",
      "localStorage.save"
    ],
    correcta: 2,
    feedback: "setItem es el método correcto."
  },
  {
    texto: "¿Qué hace getItem('usuario')?",
    opciones: [
      "Borra clave",
      "Declara objeto",
      "Obtiene valor",
      "Muestra alerta"
    ],
    correcta: 2,
    feedback: "getItem obtiene el valor de una clave almacenada."
  },
  {
    texto: "V/F: Los datos en localStorage se borran al cerrar el navegador.",
    opciones: ["Verdadero", "Falso"],
    correcta: 1,
    feedback: "Falso. Persiste hasta que se elimine manualmente."
  }
];

let indice = 0;
let respuestas = [];

const preguntaTexto = document.getElementById("question-text");
const contenedor = document.getElementById("answers");
const retro = document.getElementById("feedback");
const siguiente = document.getElementById("next-btn");
const progreso = document.getElementById("progress");
const resumen = document.getElementById("summary");
const puntaje = document.getElementById("score");

function cargarPregunta() {
  const q = preguntas[indice];
  preguntaTexto.innerText = `(${indice + 1}/${preguntas.length}) ${q.texto}`;
  contenedor.innerHTML = "";
  retro.innerText = "";
  siguiente.disabled = true;

  q.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = () => seleccionar(i);
    contenedor.appendChild(btn);
  });

  actualizarProgreso();
}

function seleccionar(i) {
  const correcta = preguntas[indice].correcta;
  const esCorrecta = i === correcta;
  respuestas.push(esCorrecta);
  retro.innerText = preguntas[indice].feedback;
  retro.style.color = esCorrecta ? "green" : "red";
  localStorage.setItem("examenRespuestas", JSON.stringify(respuestas));
  siguiente.disabled = false;
}

function actualizarProgreso() {
  const porcentaje = (indice / preguntas.length) * 100;
  progreso.style.width = `${porcentaje}%`;
  progreso.style.backgroundColor = porcentaje <= 40 ? "red" : porcentaje <= 70 ? "orange" : "green";
}

siguiente.addEventListener("click", () => {
  indice++;
  if (indice < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarResumen();
  }
});

function mostrarResumen() {
  document.getElementById("quiz-container").classList.add("hidden");
  resumen.classList.remove("hidden");
  const total = respuestas.length;
  const correctas = respuestas.filter(r => r).length;
  puntaje.innerText = `Has respondido correctamente ${correctas} de ${total} preguntas.`;
}

cargarPregunta();
