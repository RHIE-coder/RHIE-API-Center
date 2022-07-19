const router = require('express').Router();
const { JsonRpcRequester } = require('../../../../common/lib/utils');
const { validate, ResponseBody } = require('../../../../common/lib/parser');
const { Policy, AuthToken} = require("../../../../common/lib/access-control")

module.exports = {
    routers,
    path: "/api/v1/math",
}

function routers() {

    const rpc = new JsonRpcRequester('http://127.0.0.1:6000');
    const basePolicy = {
        validTime: 10000,
        timestampName: 'X-Timestamp',
    } // need secretKey and identity

    // 요청
    router.get('/sum', async (req, res) => {
        const resBody = new ResponseBody();
        const isValid = validate(req.body)
            .notNull()
            .jsonKeys([
                'username',
                'numbers'
            ])
            .isValid();

        const member = (await rpc.request({
            method:'readDB',
            params:[req.body.username]
        })).result;

        if(isValid && member){
            const token = new AuthToken(new Policy({
                ...basePolicy,
                identity: member.username,
                secretKey: member.secretKey,
            }))
            .payload(req.body)
            .timestamp({
                [basePolicy.timestampName]: req.header[basePolicy.timestampName]
            })
            .sign()
            
            if(token.verify()){
                resBody.success([req.body.numbers].reduce((n1, n2)=> n1 + n2))
            } else {
                resBody.error('invalid token')
            }

        }else{
            resBody.error('invalid request body or not exists user');
        }
    });

    return router
}