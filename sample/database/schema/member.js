const crypto = require('crypto')

module.exports = {
    name: 'member',
    schema: {
        username: String, // String is shorthand for {type: String}
        hashed_password: String,
        nickname: String,
        salt: String,
        reg_date: { type: Date, default: Date.now },
    },
    method: [
        makeSalt, 
        encryptPasswordString, 
        makeEncryptedPassword, 
        authenticate
    ]
};

function makeSalt(){
    this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPasswordString(plainText){
    return crypto.createHmac('sha256', this.salt).update(plainText).digest('hex')
}

function makeEncryptedPassword(plainText){
    this.makeSalt();
    this.hashed_password = encryptPasswordString.bind(this)(plainText);
}

function authenticate(plainText){
    return this.hashed_password === encryptPasswordString.bind(this)(plainText);
}

