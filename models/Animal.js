const pool = require("./Bd.js")
 class Animal {
  constructor(
    name,
    idMae,
    idPai,
    gender,
    birth,
    breed,
    earing
  ) {
    this._name = name; // Nome do Animal
    this._idMae = idMae; // Nome da Mãe
    this._idPai = idPai; // Nome do Pai
    this._gender = gender; // Genero do Animal
    this._birth = birth; //Data de Nascimento
    this._earing = earing; //Brinco do animal
    this._breed = breed; //Raça do Animal
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

  }

  static async inserirAnimal(nome, brinco, brincoPai, brincoMae, raca, dataNasc, sexo) {
    try {
      const query = `
        INSERT INTO animais (nome, brinco, brincoPai, brincoMae, raca, dataNasc, sexo)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      const values = [nome, brinco, brincoPai, brincoMae, raca, dataNasc, sexo];

      const result = await pool.query(query, values);
      console.log('Inserção realizada com sucesso:', result.rowCount);
    } catch (error) {
      console.error('Erro ao inserir animal:', error);
    } finally {
      pool.end(); // Encerra a conexão com o banco de dados
    }
  }

  static async selectAll(){//Aqui ficará a query para selecionar todos os animais e exibi-los na tela

  }


  save() {

  }

  remove() {

  }
}
