const __scheme = { jsonrpc: '2.0'}

class RPC {
    static filter = {
        console: function(req, _, next){
            console.log(req.body);
            next();
        },
        validateRequestFormat: function(req, _, next){
            const validate_target = req.body;
            
            next();
        }
    }

    static stdError = {
        32700:{
            code: '-32700',
            message:'Parse error'
        },
        32600:{
            code: '-32600',
            message:'Invalid request'
        },
        32601:{
            code: '-32601',
            message:'Method not found'
        },
        32602:{
            code: '-32602',
            message:'Invalid params'
        },
        32603:{
            code: '-32603',
            message:'Internal error'
        },
    }

    static stdResponseFormat = {
        success: function(data){
            return {
                ...__scheme,
                result: data ?? null,
            }
        },
        error: function(err){
            return {
                ...__scheme,
                error: err
            }
        }
    }

}

module.exports = RPC;