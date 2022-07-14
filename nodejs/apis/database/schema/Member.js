module.exports = class Member {
    #username;

    constructor(username){
        this.#username = username;
    }

    getUsername(){
        return this.#username;
    }

}