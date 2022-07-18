function requestFilter(options){

    const verboseMode = options?.verbose || false

    return function(req, res, next){
        const parsingTarget = req.body;

        if(verboseMode){
            console.log(parsingTarget);
        }

        next()
    }
}

function getResErrorFrame(code, message){
    return {
        jsonrpc: '2.0',
        error: {
            code, 
            message,
        }
    }
}

function getResResultFrame(result){
    return {
        jsonrpc: '2.0',
        result: result ?? null,
    }
}

module.exports = {
    requestFilter,
    getResErrorFrame,
    getResResultFrame
}