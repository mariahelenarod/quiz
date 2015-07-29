var users = { admin: {id: 1, username: "admin", password: "1234"},
             maria:  {id: 2, username: "maria" , password: "5678"} };

// Comprueba si el usuario está registrado en users
// Si Autenticación falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
  if (users[login]) {
     if (password === users[login].password) {
        callback(null,users[login]);
     } else {
        callback(new Error('Password erróneo.'));
     }
  } else {
     callback(new Error('No existe el usuario.'));
  }
};