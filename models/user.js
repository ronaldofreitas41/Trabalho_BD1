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

    loadFronJSON(json) {

        

    }


    save() {//Verifica se um usuario possui um id caso contrario gera um novo para o mesmo

    }

    static getUsersStorage() {//Metodo que pega os usuários já armazenados pos cadastro

    }

    remove() {

    }

}