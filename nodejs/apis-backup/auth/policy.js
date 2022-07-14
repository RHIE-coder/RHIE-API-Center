const { Crypto } = require("../lib/utils")



class AuthorizePolicy{

    verify(token) {
        if(!(token instanceof AuthToken)) throw new TypeError("the argument must be <AuthToken> instance");
        token.getId()

    }
}



module.exports = {
    
}

console.log(AuthorizePolicy.name);