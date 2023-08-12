import {Animal} from "./models/Animal"
export class LeiteController {
  constructor(formIdCreate, formIdUpdate, tableId, cont) {
    this.formEl = document.getElementById(formIdCreate);
    this.formUpdateEl = document.getElementById(formIdUpdate);
    this.tableEl = document.getElementById(tableId);
    this.boxCreateEl = document.getElementById("box-animal-createL");
    this.boxUpdateEl = document.getElementById("box-animal-updateL");

    this.onSubmit();
    this.onEdit();
    //this.selectAll(cont);
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

      let animal = new Animal();

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
  }


  onSubmit() {
    this.boxCreateEl.style.display = "block";
    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();

      let btn = this.formEl.querySelector("[type=submit]");

      btn.disabled = true;

      let values = this.getValues(this.formEl);

      if (!values) return false;

      console.log(values._name);

      Animal.inserirAnimal(values._name,values._earing,values._idPai,values._idMae,values._breed,values._birth,
        values._gender)
      this.addLine(values);

      this.formEl.reset();

      btn.disabled = false;
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

    let boi = new Animal(
      animal.name,
      animal.earingM,
      animal.earingP,
      animal.gender,
      animal.birth,
      animal.breed,
      animal.earing
    );
    console.log(boi);
    return boi;
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
          <td>${dataanimal.name}</td>
          <td>${dataanimal.earing}</td>
          <td>${dataanimal.breed}</td>
          <td>${dataanimal.gender}</td>
          <td>${dataanimal.leite}</td>
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
