const { Crypto } = require('./utils');
const { validate } = require('./parser');

class Policy {

    #setting

    constructor(setting){
        const isValid = [
            validate(setting).notNull().type(Object).isValid(),
            validate(setting.validTime).notNull().type(Number).isValid(),
            validate(setting.secretKey).notNull().type(String).isValid(),
            validate(setting.timestampName).notNull().type(String).isValid(),
        ].every(tureOrFalse=>tureOrFalse===true);

        if(!isValid) {
            throw new TypeError('policy arugment error');
        }
        this.#setting = setting; 
    }

    getValidTime(){
        return this.#setting.validTime;
    }

    getSecretKey(){
        return this.#setting.secretKey;
    }

    getTimestampName(){
        return this.#setting.timestampName;
    }
}

class AuthToken {
    
    #policy
    #payload
    #timestamp
    #signature

    constructor(policy){
        const isValid = validate(policy).notNull().type(Policy).isValid();
        if(!isValid) {
            throw new TypeError('the argument must be instance of <Policy>')
        }

        this.#policy = policy;
    }

    payload(data){
        this.#payload = data;
        return this;
    }

    timestamp(timestamp){
        if(!validate(timestamp).same(this.#policy.getTimestampName()).isValid()){
            throw new TypeError('violate policy')
        }
        this.#timestamp = timestamp[this.#policy.getTimestampName()];
        return this;
    }

    sign(){
        const data = this.#payload + ', ' + this.#timestamp;
        const secretKey = this.#policy.getSecretKey()
        const hmacSha256 = Crypto.createHmacSha256({
            secretKey,
            data,
        });

        this.#signature = hmacSha256;

        return this;
    }

    verify(signature){
        const isExceedTime = (this.#timestamp + this.#policy.validTime) < Date.now();
        const isSameSign = this.#signature === signature;
        return (isSameSign && !isExceedTime)
    }
}

module.exports = {
    Policy,
    AuthToken,
}