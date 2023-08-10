class Animal {
  constructor(
    name,
    idMae,
    idPai,
    gender,
    birth,
    breed,
    earing,
    photo,
    matrix,
    peso,
    preço
  ) {
    this._name = name; // Nome do Animal
    this._idMae = idMae; // Nome da Mãe
    this._idPai = idPai; // Nome do Pai
    this._gender = gender; // Genero do Animal
    this._birth = birth; //Data de Nascimento
    this._earing = earing; //Brinco do animal
    this._breed = breed; //Raça do Animal
    this._photo = photo; //Foto do Animal
    this._matrix = matrix; //Se o Animal é Matriz ou Reprodutor
    this._register = new Date(); //Data de registro
  }

  get register() {
    return this._register;
  }

  get name() {
    return this._name;
  }

  get nameMon() {
    return this._nameMon;
  }

  get nameDad() {
    return this._nameDad;
  }

  get gender() {
    return this._gender;
  }

  get birth() {
    return this._birth;
  }

  get earing() {
    return this._earing;
  }

  get breed() {
    return this._breed;
  }

  get photo() {
    return this._photo;
  }

  get matrix() {
    return this._matrix;
  }

  set photo(value) {
    this._photo = value;
  }

  loadFromJSON(json) {
    for (let name in json) {
      switch (name) {
        case "_register":
          this[name] = new Date(json[name]);
          break;
        default:
          this[name] = json[name];
      }
    }
  }

  static getAnimalStorage(tipo) {
    let animals = [];
    if (tipo == "C") {
      if (localStorage.getItem("animalC")) {
        animals = JSON.parse(localStorage.getItem("animalC"));
      }
    } else if (tipo == "L") {
      if (localStorage.getItem("animalL")) {
        animals = JSON.parse(localStorage.getItem("animalL"));
      }
    }

    return animals;
  }

  save() {

  }

  remove() {

  }
}
