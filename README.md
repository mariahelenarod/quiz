# quiz

Proyecto final para el curso online de [desarrollo de servicios en la nube con HTML5, javascript y node.js](https://www.miriadax.net/web/javascript-node-js) de MiriadaX, este curso trata del desarrollo de aplicaciones web de servidor utilizando javascript, node.js y express.js.


### Historia

Este proyecto tiene 25 commits que inicia con el esqueleto del [proyecto en github del profesor J Quemada](https://github.com/jquemada/quiz-2015), mas las siguientes tareas:

* Enlace a proyecto en github y pagina de creditos (Modulo 6)
* Buscador de preguntas (Modulo 7)
* Indice tematico (Modulo 8)
* Auto-logout (Modulo 9)

### Requisitos

Se necesita que se instalen los siguientes programas para la ejecucion del proyecto:

* [Node.js](http://nodejs.org)
* **Express generator**. Crear una carpeta llamada *apps-express-generator* y ejecutar en esa carpeta desde la linea de comandos: `> npm install -g express-generator@4.9.0`
* [Heroku toolbet](https://toolbelt.heroku.com)

### Instalacion

* Bajar el proyecto de github y crear una carpeta llamada *quiz* dentro de la carpeta *apps-express-generator* para copiarlo
* Copiar el fichero **.env** a la carpeta *quiz*, sino lo tiene crearlo y añadir lo siguiente:
```
  DATABASE_URL=sqlite://:@:/
  DATABASE_STORAGE=quiz.sqlite
```
* Desde la linea de comando, en la carpeta *quiz* ejecutar: `> npm install`

### Ejecucion

* Desde la linea de comandos en la carpeta *quiz* ejecutar: `> foreman start`
* Abrir el navegador con el url: [http://localhost:5000](http://localhost:5000)
