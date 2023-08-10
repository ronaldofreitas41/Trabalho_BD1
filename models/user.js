class User {

    constructor(cpf,name, dataNasc, password) {
        this._cpf = cpf;
        this._name = name;
        this._birth = dataNasc;
        this._email = email;
        this._password = password;
        this._phoneNumber = phoneNumber;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }

    loadFronJSON(json) {

        for (let name in json) {

            switch (name) {

                case '_register':

                    this[name] = new Date(json[name])

                    break;

                default:

                    this[name] = json[name];

                    break;
            }


        }

    }



    save() {//Verifica se um usuario possui um id caso contrario gera um novo para o mesmo

    }

    static getUsersStorage() {//Metodo que pega os usuários já armazenados pos cadastro

    }

    remove() {

    }

}