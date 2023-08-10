function name(params) {
    
}
const user = storedUsers.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    window.location.href = 'pagina-de-destino.html';
  } else {
    alert('Nome de usuário ou senha incorretos');
  }