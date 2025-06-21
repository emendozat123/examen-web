document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const introScreen = document.getElementById('intro-screen');
    const examScreen = document.getElementById('exam-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startExamBtn = document.getElementById('start-exam');
    const submitExamBtn = document.getElementById('submit-exam');
    const restartExamBtn = document.getElementById('restart-exam');
    const questionContainer = document.getElementById('question-container');
    const studentInfo = document.getElementById('student-info');
    const studentResultInfo = document.getElementById('student-result-info');
    const scoreDisplay = document.getElementById('score-display');
    const feedbackContainer = document.getElementById('feedback-container');
    const timerDisplay = document.getElementById('timer');

    // Variables del examen
    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let timer;
    let timeLeft = 45 * 60; // 45 minutos en segundos
    let examStarted = false;

    // Preguntas del examen
    const questions = [
        // HTML (3 preguntas)
        {
            question: "¿Qué etiqueta HTML se utiliza para crear un enlace?",
            options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
            ],
            answer: 1,
            feedback: "La etiqueta correcta es &lt;a&gt;. Ejemplo: &lt;a href='https://ejemplo.com'&gt;Enlace&lt;/a&gt;"
        },
        {
            question: "¿Cuál es el elemento HTML correcto para el encabezado más importante?",
            options: [
                "<h6>",
                "<heading>",
                "<h1>",
                "<head>"
            ],
            answer: 2,
            feedback: "&lt;h1&gt; es el encabezado de mayor importancia, seguido de &lt;h2&gt; hasta &lt;h6&gt;."
        },
        {
            question: "¿Qué atributo HTML especifica un texto alternativo para una imagen?",
            options: [
                "src",
                "alt",
                "title",
                "longdesc"
            ],
            answer: 1,
            feedback: "El atributo 'alt' proporciona texto alternativo para imágenes, importante para accesibilidad y cuando la imagen no se carga."
        },
        
        // CSS (3 preguntas)
        {
            question: "¿Qué propiedad CSS se utiliza para cambiar el color del texto?",
            options: [
                "text-color",
                "font-color",
                "color",
                "text-style"
            ],
            answer: 2,
            feedback: "La propiedad 'color' establece el color del texto. Ejemplo: color: blue;"
        },
        {
            question: "¿Cómo se selecciona un elemento con id 'header' en CSS?",
            options: [
                ".header",
                "#header",
                "header",
                "*header"
            ],
            answer: 1,
            feedback: "Los selectores de ID usan el símbolo #. Para clases se usa el punto (.)"
        },
        {
            question: "¿Qué propiedad CSS se usa para cambiar el tipo de letra?",
            options: [
                "font-family",
                "text-style",
                "font-type",
                "font-face"
            ],
            answer: 0,
            feedback: "font-family especifica el tipo de letra. Ejemplo: font-family: Arial, sans-serif;"
        },
        
        // JavaScript (4 preguntas)
        {
            question: "¿Cómo se declara una variable en JavaScript que no puede ser reasignada?",
            options: [
                "var",
                "let",
                "const",
                "variable"
            ],
            answer: 2,
            feedback: "const declara una constante que no puede ser reasignada. let permite reasignación y var es la forma antigua."
        },
        {
            question: "¿Qué método de array en JavaScript añade un elemento al final?",
            options: [
                "push()",
                "pop()",
                "shift()",
                "unshift()"
            ],
            answer: 0,
            feedback: "push() añade al final, pop() elimina del final, shift() elimina del inicio, unshift() añade al inicio."
        },
        {
            question: "¿Cuál es el resultado de '2' + '2' en JavaScript?",
            options: [
                "4",
                "'4'",
                "22",
                "'22'"
            ],
            answer: 3,
            feedback: "El operador + concatena strings. Para suma numérica necesitarías convertir los strings a números primero."
        },
        {
            question: "¿Qué método se usa para ejecutar una función después de un tiempo determinado?",
            options: [
                "setInterval()",
                "setTimeout()",
                "wait()",
                "delay()"
            ],
            answer: 1,
            feedback: "setTimeout() ejecuta una función una vez después del tiempo especificado. setInterval() lo repite."
        },
        
        // DOM (4 preguntas)
        {
            question: "¿Qué método selecciona el primer elemento que coincide con un selector CSS?",
            options: [
                "document.querySelector()",
                "document.querySelectorAll()",
                "document.getElement()",
                "document.findElement()"
            ],
            answer: 0,
            feedback: "querySelector() devuelve el primer elemento que coincide. querySelectorAll() devuelve todos."
        },
        {
            question: "¿Qué propiedad DOM contiene el texto de un elemento?",
            options: [
                "innerHTML",
                "textContent",
                "outerHTML",
                "nodeValue"
            ],
            answer: 1,
            feedback: "textContent obtiene/setea el texto plano. innerHTML incluye etiquetas HTML."
        },
        {
            question: "¿Cómo se añade un event listener para el evento 'click'?",
            options: [
                "element.onclick = function() {}",
                "element.addListener('click', function() {})",
                "element.addEventListener('click', function() {})",
                "element.click(function() {})"
            ],
            answer: 2,
            feedback: "addEventListener es el método estándar para manejar eventos. Permite múltiples listeners."
        },
        {
            question: "¿Qué método crea un nuevo nodo de elemento?",
            options: [
                "document.newElement()",
                "document.createElement()",
                "document.addElement()",
                "document.buildElement()"
            ],
            answer: 1,
            feedback: "document.createElement(tagName) crea un nuevo elemento HTML."
        },
        
        // Local Storage (3 preguntas)
        {
            question: "¿Qué método almacena datos en localStorage?",
            options: [
                "localStorage.setItem()",
                "localStorage.store()",
                "localStorage.save()",
                "localStorage.add()"
            ],
            answer: 0,
            feedback: "setItem(key, value) almacena datos. Los datos persisten incluso después de cerrar el navegador."
        },
        {
            question: "¿Cómo se elimina un ítem específico de localStorage?",
            options: [
                "localStorage.delete()",
                "localStorage.remove()",
                "localStorage.removeItem()",
                "localStorage.clearItem()"
            ],
            answer: 2,
            feedback: "removeItem(key) elimina un ítem específico. clear() elimina todo."
        },
        {
            question: "¿Qué tipo de datos puede almacenar localStorage?",
            options: [
                "Solo strings",
                "Strings y números",
                "Strings, números y booleanos",
                "Cualquier tipo de dato"
            ],
            answer: 0,
            feedback: "localStorage solo almacena strings. Para otros tipos, necesitas convertirlos (JSON.stringify/parse)."
        },
        
        // 3 preguntas adicionales para completar 20
        {
            question: "¿Qué etiqueta HTML5 se usa para contenido independiente como un artículo?",
            options: [
                "<section>",
                "<article>",
                "<div>",
                "<content>"
            ],
            answer: 1,
            feedback: "&lt;article&gt; representa contenido independiente que tendría sentido por sí solo."
        },
        {
            question: "¿Qué pseudoclase CSS selecciona un elemento cuando el ratón está sobre él?",
            options: [
                ":active",
                ":hover",
                ":focus",
                ":over"
            ],
            answer: 1,
            feedback: ":hover aplica estilos cuando el usuario interactúa con el elemento con el cursor."
        },
        {
            question: "¿Qué método convierte un objeto JavaScript a string JSON?",
            options: [
                "JSON.toString()",
                "JSON.stringify()",
                "JSON.parse()",
                "JSON.toJSON()"
            ],
            answer: 1,
            feedback: "JSON.stringify() convierte objetos a strings JSON. JSON.parse() hace lo contrario."
        }
    ];

    // Event listeners
    startExamBtn.addEventListener('click', startExam);
    submitExamBtn.addEventListener('click', finishExam);
    restartExamBtn.addEventListener('click', restartExam);

    // Función para iniciar el examen
    function startExam() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        
        if (!nombre || !apellidos) {
            alert('Por favor ingresa tu nombre y apellidos');
            return;
        }
        
        // Guardar información del estudiante
        studentInfo.textContent = `Estudiante: ${nombre} ${apellidos}`;
        studentResultInfo.textContent = `Estudiante: ${nombre} ${apellidos}`;
        
        // Mostrar pantalla de examen
        introScreen.classList.add('hidden');
        examScreen.classList.remove('hidden');
        
        // Iniciar temporizador
        startTimer();
        
        // Mostrar primera pregunta
        showQuestion();
    }

    // Función para mostrar preguntas
    function showQuestion() {
        if (currentQuestion >= questions.length) {
            submitExamBtn.classList.remove('hidden');
            return;
        }
        
        const question = questions[currentQuestion];
        questionContainer.innerHTML = '';
        
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        const questionText = document.createElement('div');
        questionText.classList.add('question-text');
        questionText.textContent = `${currentQuestion + 1}. ${question.question}`;
        questionElement.appendChild(questionText);
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', function() {
                // Deseleccionar todas las opciones
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Seleccionar la opción clickeada
                this.classList.add('selected');
                
                // Guardar respuesta del usuario
                userAnswers[currentQuestion] = parseInt(this.dataset.index);
                
                // Pasar a la siguiente pregunta después de un breve retraso
                setTimeout(() => {
                    currentQuestion++;
                    showQuestion();
                }, 500);
            });
            
            questionElement.appendChild(optionElement);
        });
        
        questionContainer.appendChild(questionElement);
    }

    // Función para iniciar el temporizador
    function startTimer() {
        if (examStarted) return;
        examStarted = true;
        
        timer = setInterval(function() {
            timeLeft--;
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerDisplay.textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                finishExam();
            }
        }, 1000);
    }

    // Función para finalizar el examen
    function finishExam() {
        clearInterval(timer);
        
        // Calcular puntaje
        score = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });
        
        // Mostrar pantalla de resultados
        examScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        // Mostrar puntaje
        const percentage = Math.round((score / questions.length) * 100);
        scoreDisplay.textContent = `Puntaje: ${score} de ${questions.length} (${percentage}%)`;
        
        // Mostrar retroalimentación
        feedbackContainer.innerHTML = '';
        questions.forEach((question, index) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            
            const questionText = document.createElement('p');
            questionText.innerHTML = `<strong>Pregunta ${index + 1}:</strong> ${question.question}`;
            feedbackItem.appendChild(questionText);
            
            const userAnswer = document.createElement('p');
            const userAnswerText = userAnswers[index] !== undefined ? 
                `Tu respuesta: ${question.options[userAnswers[index]]}` : 
                'No respondiste esta pregunta';
            userAnswer.textContent = userAnswerText;
            feedbackItem.appendChild(userAnswer);
            
            const correctAnswer = document.createElement('p');
            correctAnswer.textContent = `Respuesta correcta: ${question.options[question.answer]}`;
            feedbackItem.appendChild(correctAnswer);
            
            const feedbackText = document.createElement('p');
            feedbackText.innerHTML = `<strong>Explicación:</strong> ${question.feedback}`;
            feedbackItem.appendChild(feedbackText);
            
            if (userAnswers[index] === question.answer) {
                feedbackItem.classList.add('correct');
            } else {
                feedbackItem.classList.add('incorrect');
            }
            
            feedbackContainer.appendChild(feedbackItem);
        });
    }

    // Función para reiniciar el examen
    function restartExam() {
        // Resetear variables
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        timeLeft = 45 * 60;
        examStarted = false;
        
        // Resetear pantallas
        resultsScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        
        // Resetear formulario
        document.getElementById('nombre').value = '';
        document.getElementById('apellidos').value = '';
        
        // Resetear temporizador
        timerDisplay.textContent = 'Tiempo restante: 45:00';
    }
});
