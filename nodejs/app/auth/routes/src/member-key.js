const router = require('express').Router();
const { JsonRpcRequester, Crypto } = require('../../../../common/lib/utils')
const { validate, ResponseBody } = require('../../../../common/lib/parser');

module.exports = {
    routers,
    path: "/member/key",
}

function routers() {

    const rpc = new JsonRpcRequester('http://127.0.0.1:6000');
    
    // secret key 생성 및 발급
    router.post('/', async (req, res) => {
        const resBody = new ResponseBody();
        const isValid = validate(req.body)
            .notNull()
            .jsonKeys([
                'usernmae',
                'password',
            ])
            .done();
        
        if(isValid){
            const member = (await rpc.request({
                method:'readDB',
                params:[req.body.username]
            })).result;

            if(member){
                const secretKey = Crypto.generateKey256();
                const data = {
                    ...member,
                    secretKey,
                }

                const resultMsg = (await rpc.request({
                    method: 'updateDB',
                    params: [
                        req.body.username,
                        data,
                    ]
                })).result;

                if(resultMsg === 'success'){
                    resBody.success({secretKey});
                } else {
                    resBody.error('fail from rpc')
                }
            } else {
                resBody.error('not exists')
            }
        }else{
            resBody.error('invalid request body')
        }
        

        res.send(resBody.json());
    })

    return router
}