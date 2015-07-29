var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
	    where: { id: Number(quizId) },
        include: [{ model: models.Comment }]
	   }).then(
		    function(quiz) {
			  if (quiz) {
			    req.quiz = quiz;
			    next();
			  } else { 
			    next(new Error('No existe quizId=' + quizId)); 
			  }
		    }
		  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
   // Lo ordeno por id ASC, porque al editar pregunta con la base de datos postgres, te lo desordena
  if (!req.query.search) { 
    models.Quiz.findAll({order: 'id ASC'}   
	).then(
      function(quizes) {
        res.render('quizes/index.ejs', { quizes: quizes, errors: []});
      }
    ).catch(function(error) { next(error);}); //
  } else {    
    models.Quiz.findAll({
      where: [ "lower(pregunta) like lower(?)", "%"+req.query.search.replace(/\s/g, "%")+"%" ], 
	  order: 'pregunta ASC'
    }).then( 
	  function(quizes) {
        res.render( 'quizes/index.ejs', { quizes: quizes, errors: []});
      }
    ).catch(function(error) {next(error);}); //
  }
};

//GET /quizes/:id
exports.show = function(req,res){
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
	 var resultado = 'Incorrecto';
	 if (req.query.respuesta===req.quiz.respuesta) {
       resultado = 'Correcto'; 
     }
	 res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "", respuesta: "", tema: "Otro"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  quiz.validate().then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
		// save: guarda en DB campos pregunta, respuesta y tema de quiz
        quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( 
		  function(){
			// res.redirect: Redirección HTTP a lista de preguntas
			res.redirect('/quizes');
		  }
		); 
      }      
    }
  ).catch(function(error){next(error);}); //
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  // Autoload de la instancia de quiz en req
  res.render('quizes/edit', {quiz: req.quiz, errors: [] });
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  //validar la coherencia del quiz
  req.quiz.validate().then(
    function(err) {
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        //save: guarda en DB campos pregunta, respuesta y tema de quiz
        req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
          //Redireccion HTTP (URL relativo) lista de preguntas
          function() {res.redirect('/quizes');}
        );
      }
    }
  ).catch(function(error){next(error);}); //
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error);}); //
};