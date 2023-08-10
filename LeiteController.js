class LeiteController {
  constructor(formIdCreate, formIdUpdate, tableId, cont) {
    this.formEl = document.getElementById(formIdCreate);
    this.formUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);
    this.boxCreateEl = document.getElementById("box-animal-createL");
    this.boxUpdateEl = document.getElementById("box-animal-updateL");

    this.onSubmit();
    this.onEdit();
    this.selectAll(cont);
  }

  onEdit() {
    document
      .querySelector("#box-animal-updateL .btn-cancel")
      .addEventListener("click", (e) => {
        this.showPanelCreate();
      });

    this.formUpdateEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formUpdateEl.querySelector("[type=submit]");

      btn.disabled = true;

      let values = this.getValues(this.formUpdateEl);

      let index = this.formUpdateEl.dataset.trIndex;

      let tr = this.tableEl.rows[index];

      let animalOld = JSON.parse(tr.dataset.animal);

      let result = Object.assign({}, animalOld, values);

      this.getPhoto(this.formUpdateEl).then(
        (content) => {
          if (!values.photo) {
            result._photo = animalOld._photo;
          } else {
            result._photo = content;
          }

          let animal = new BovinoLeite();

          animal.loadFromJSON(result);

          animal.save("L");

          this.getTr(animal, tr);

          this.updateCount();

          this.formUpdateEl.reset();

          this.showPanelCreate();

          btn.disabled = false;
        },
        (e) => {
          console.error(e);
        }
      );
    });
  }

  onSubmit() {
    this.boxCreateEl.style.display = "block";
    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formEl.querySelector("[type=submit]");

      btn.disabled = true;

      let values = this.getValues(this.formEl);

      if (!values) return false;

      this.getPhoto(this.formEl).then(
        (content) => {
          values.photo = content;

          values.save("L");

          this.addLine(values);

          this.formEl.reset();

          btn.disabled = false;
        },
        (e) => {
          console.error(e);
        }
      );
    });
  }

  getPhoto(formEl) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();

      let elements = [...formEl.elements].filter((item) => {
        if (item.name === "photo") {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (e) => {
        reject(e);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve("dist/img/vaca.png");
      }
    });
  }

  getValues(formEl) {
    let animal = {};
    let isValid = true;

    [...formEl.elements].forEach(function (field, index) {
      if (["name"].indexOf(field.name) > -1 && !field.value) {
        field.parentElement.classList.add("has-error");
        isValid = false;
      }

      if (field.name === "gender") {
        if (field.checked) {
          animal[field.name] = field.value;
        }
      } else if (field.name == "matrix" || field.name == "breastfeeding") {
        animal[field.name] = field.checked;
      } else {
        animal[field.name] = field.value;
      }
    });

    if (!isValid) {
      return false;
    }

    let boi = new BovinoLeite(
      animal.name,
      animal.nameM,
      animal.nameP,
      animal.gender,
      animal.birth,
      animal.breed,
      animal.earing,
      animal.photo,
      animal.matrix,
      animal.leite
    );
    console.log(boi);
    return boi;
  }

  selectAll(cont) {
    if (cont == 0) {
      let animals = Animal.getAnimalStorage("L");

      animals.forEach((dataanimal) => {
        let animal = new BovinoCorte();

        animal.loadFromJSON(dataanimal);

        this.addLine(animal);
      });
    }
  }

  addLine(dataanimal) {
    let tr = this.getTr(dataanimal);

    this.tableEl.appendChild(tr);

    this.updateCount();
  }

  getTr(dataanimal, tr = null) {
    if (tr === null) tr = document.createElement("tr");

    tr.dataset.animal = JSON.stringify(dataanimal);

    tr.innerHTML = `
          <td><img src=${
            dataanimal.photo
          } style = "width: 50px" class="img-sqaure img-sm"></td>
          <td>${dataanimal.name}</td>
          <td>${dataanimal.earing}</td>
          <td>${dataanimal.gender}</td>
          <td>${dataanimal.matrix ? "Sim" : "Não"}</td>
          <td>
              <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
              <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
          </td>
      `;

    this.addEventsTr(tr);

    return tr;
  }

  addEventsTr(tr) {
    tr.querySelector(".btn-delete").addEventListener("click", (e) => {
      if (confirm("Deseja relamente excluir?")) {
        let animal = new Animal();

        animal.loadFromJSON(JSON.parse(tr.dataset.animal));

        animal.remove("L");

        tr.remove("L");

        this.updateCount();
      }
    });

    tr.querySelector(".btn-edit").addEventListener("click", (e) => {
      let json = JSON.parse(tr.dataset.animal);

      this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

      for (let name in json) {
        let field = this.formUpdateEl.querySelector(
          "[name=" + name.replace("_", "") + "]"
        );

        if (field) {
          switch (field.type) {
            case "file":
              continue;
              break;

            case "radio":
              field = this.formUpdateEl.querySelector(
                "[name=" + name.replace("_", "") + "][value=" + json[name] + "]"
              );
              field.checked = true;
              break;

            case "checkbox":
              field.checked = json[name];
              break;

            default:
              field.value = json[name];
          }

          field.value = json[name];
        }
      }
      console.log(json._photo);

      this.formUpdateEl.querySelector(".photo").src = json._photo;

      this.showPanelUpdate();
    });
  }

  showPanelCreate() {
    this.boxCreateEl.style.display = "block";
    this.boxUpdateEl.style.display = "none";
  }

  showPanelUpdate() {
    this.boxCreateEl.style.display = "none";
    this.boxUpdateEl.style.display = "block";
  }

  updateCount() {
    let numberanimals = 0;
    let numberAdmin = 0;

    [...this.tableEl.children].forEach((tr) => {
      numberanimals++;

      let animal = JSON.parse(tr.dataset.animal);

      if (animal._matrix) numberAdmin++;
    });

    document.querySelector("#number-users").innerHTML = numberanimals;
    document.querySelector("#number-users-admin").innerHTML = numberAdmin;
  }
}
