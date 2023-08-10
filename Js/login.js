let entrarBtn = document.getElementById("logBtn");
let regBtn = document.getElementById("regBtn");

entrarBtn.addEventListener("click", logar);
regBtn.addEventListener("click", registrar);

function logar() {

  let senha = "ronaldo20";
  let email = "ronaldinho.lfs@gmail.com";
  // Obtém as entradas do usuário
  let senhaU = document.getElementById("senha").value;
  let emailU = document.getElementById("email").value;
  // Verifica se as entradas correspondem aos valores esperados
  if (emailU == email) {
    if (senhaU == senha) {
      // Dados conferem, continue com a autenticação
      location.href = "index.html";
      alert("Login realizado com sucesso!");
    }
  } else {
    // Dados não conferem, trate o erro
    alert("Verifique a sua entrada");
  }
}

function registrar() {
  location.href = "registration.html";
}
