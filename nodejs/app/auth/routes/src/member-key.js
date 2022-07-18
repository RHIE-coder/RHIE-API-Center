const router = require('express').Router();
const { JsonRpcRequester, Crypto } = require('../../../../common/lib/utils')

module.exports = {
    routers,
    path: "/member/key",
}

function routers() {

    const rpc = new JsonRpcRequester('http://127.0.0.1:6000');
    
    // secret key 생성 및 발급
    router.post('/key', async (req, res) => {

        const secretKey = Crypto.generateKey256();
        const username = req.body.username;
        let resBody = {};

        const user = (await rpc.request({
            method:'readDB',
            params: [username]
        })).result

        if(!user) {
            resBody['result'] = '401';
            resBody['message'] = 'user is not exists';
        } else {
            user['secretKey'] = secretKey;

            const resultStr = await rpc.request({
                method:'updateDB',
                params: [
                    username,
                    user
                ]
            })
            
            if(resultStr === 'success'){
                resBody['result'] = '200';
                resBody['data'] = {secretKey};
            }else{
                resBody['result'] = '401';
                resBody['message'] = 'fail to update';
            }
        }

        res.send(resBody)
    })

    return router
}