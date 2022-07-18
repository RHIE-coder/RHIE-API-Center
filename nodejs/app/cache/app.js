const express = require('express');
const app = express();
const http = require('http')
const serverConfig = require('../../config/cache-server');
const jsonRpcParser = require('./module/json-rpc-parser')
const { MemoryDB } = require("./database/memory")

// Parsing
// app.use(express.urlencod ed({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

// Request Logging on Console
app.use('/', (req, res) => {
    console.log({
        method: req.method,
        url: req.url,
        ip: req.ip,
    });

    req.next()
});

// MemoryDB init
app.set('memDB', new MemoryDB())

// Implements JSON-RPC
// https://jsonrpc.org/historical/json-rpc-2-0.html
app.post('/', jsonRpcParser.requestFilter({
    verbose: true
}), async (req, res) => {
    const method = req.body.method;
    const params = req.body.params;
    let isSuccessToInvoke = false;
    let resBody = {};
    let result;

    if (!(params instanceof Array)) {
        resBody = jsonRpcParser.getResErrorFrame('-32602', "Invalid params")
    } else {

        const memDB = req.app.get('memDB');

        if (method === 'updateDB') {
            result = await memDB.set(params[0], params[1]) ? 'success' : 'fail';
            isSuccessToInvoke = true;
        } else if (method === 'readDB') {
            result = await memDB.get(params[0])
            isSuccessToInvoke = true;
        } else if (method === 'removeDB') {
            result= await memDB.remove(params[0]) ? 'success' : 'fail';
            isSuccessToInvoke = true;
        } else {
            resBody = jsonRpcParser.getResErrorFrame('-32601', "Method not found")
        }


        if(isSuccessToInvoke) {
            resBody = jsonRpcParser.getResResultFrame(result)
        }

    }

    if (req.body.id) {
        resBody['id'] = req.body.id
    } else {
        resBody['id'] = null
    }
    
    res.send(resBody)

})

// Running Server
http.createServer(app).listen(serverConfig.PORT, serverConfig.HOST,() => {

    console.log(`app listening at https://localhost:${serverConfig.PORT}`);
    
});
