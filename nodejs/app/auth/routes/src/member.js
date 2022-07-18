const router = require('express').Router();
const { JsonRpcRequester, Crypto } = require('../../../../common/lib/utils')

module.exports = {
    routers,
    path: "/member",
}

function routers() {

    const rpc = new JsonRpcRequester('http://127.0.0.1:6000');

    // member 생성
    router.post('/', async (req, res) => {

        let resBody = {}

        const data = {
            ...req.body
        }

        let resultJson = (await rpc.request({
            method:'readDB',
            params: [data.username]
        })).result;

        if(resultJson === 'no data') {
            data['createdDate'] = new Date();

            await rpc.request({
                method:'updateDB',
                params: [
                    data.username,
                    data
                ]
            })

            resBody['result'] = 200;
        } else {
            resBody['result'] = 401;
            resBody['message'] = 'already exists'
        }

        res.send(resBody);
    });
    
    // member 조회
    router.get('/', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        let resultJson = (await rpc.request({
            method:'readDB',
            params: [username]
        })).result;


        if(username === resultJson.username && password === resultJson.password) {
            delete resultJson['password']
        } else {
           resultJson = { result: 401} 
        }

        res.send(resultJson);
    });

    // member 수정
    router.put('/', async (req, res) => {
        let resBody = {}
        const username = req.body.username;
        const password = req.body.password;

        let resultJson = (await rpc.request({
            method:'readDB',
            params: [username]
        })).result;

        if(username === resultJson.username && password === resultJson.password) {

            if(req.body.newPassword) {
                resultJson.password = req.body.newPassword;
            }

            resultJson['updatedDate'] = new Date();

            await rpc.request({
                method:'update',
                params: [
                    username,
                    resultJson
                ]
            })

            resBody = { result: 200 }
        } else {
            resBody = { result: 401 } 
        }

        res.send(resBody);
    });

    
    // member 수정
    router.put('/', async (req, res) => {
        let resBody = {}
        const username = req.body.username;
        const password = req.body.password;

        let resultJson = (await rpc.request({
            method:'readDB',
            params: [username]
        })).result;

        if(username === resultJson.username && password === resultJson.password) {

            if(req.body.newPassword) {
                resultJson.password = req.body.newPassword;
            }

            resultJson['updatedDate'] = new Date();

            await rpc.request({
                method:'update',
                params: [
                    username,
                    resultJson
                ]
            })

            resBody = { result: 200 }
        } else {
            resBody = { result: 401 } 
        }

        res.send(resBody);
    });

    return router
}