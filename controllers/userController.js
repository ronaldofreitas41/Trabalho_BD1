class UserController {
  constructor(formIdCreate) {
    this.formEl = document.getElementById(formIdCreate);
    this.cancelBtn = document.getElementById("cancel-btn");
    this.saveBtn = document.getElementById("save-btn");
    this.onSubmit();
    this.onCancel();
  }

  onCancel() {
    this.cancelBtn.addEventListener("click", (event) => {
      location.href = "Login.html";
    });
  }

  onSubmit() {
    this.saveBtn.addEventListener("click", (event) => {
      event.preventDefault();

      let values = this.getValues(this.formEl);

      alert("Usuario cadastrado com sucesso!");

      if (!values) return false;

      values.save();
      
      location.href = "Login.html";
    });
  }


  getValues(formEl) {
    let user = {};
    let isValid = true;
    
    [...formEl.elements].forEach(function (field, index) {
      if (["name"].indexOf(field.name) > -1 && !field.value) {
        field.parentElement.classList.add("has-error");
        isValid = false;
      }

      if (field.name === "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else {
        user[field.name] = field.value;
      }
    });

    if (!isValid) {
      return false;
    }
    console.log(user);
    if (user.password !== user.passwordR) {
      alert("As senhas não coincidem!");
      this.getValues()
      // Impede o envio do formulário
    }

    return new User(
      user.name,
      user.gender,
      user.birth,
      user.email,
      user.password,
      user.phoneNumber,
      user.farmName
    );
  }
}
