module.exports = class AuthToken {

    #ACCESS_KEY
    #SECRET_KEY

    constructor(policy){
        this.#ACCESS_KEY = policy.secretKeyId;
        this.#SECRET_KEY = policy.secretKey;
    }

    getId(){
        return this.#ACCESS_KEY;
    }

    getKey(){
        return this.#SECRET_KEY;
    }

}

