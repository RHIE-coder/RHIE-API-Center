const router = require('express').Router();
const { JsonRpcRequester, Crypto } = require('../../../../common/lib/utils');
const { validate, ResponseBody } = require('../../../../common/lib/parser');

module.exports = {
    routers,
    path: "/member",
}

function routers() {

    const rpc = new JsonRpcRequester('http://127.0.0.1:6000');

    // member 생성
    router.post('/', async (req, res) => {
        const resBody = new ResponseBody();
        const isValid = await validate(req.body)
            .notNull()
            .jsonKeys([
                'username',
                'password',
                'nickname',
                'age',
            ]).done();

        if (isValid) {
            const isExist = (await rpc.request({
                method: 'readDB',
                params: [req.body.username]
            })).result;

            if (isExist) {
                resBody.error('already exists')
            } else {

                const data = {
                    ...req.body,
                    createdDate: new Date()
                };

                const resultMsg = (await rpc.request({
                    method: 'updateDB',
                    params: [
                        req.body.username,
                        data
                    ]
                })).result

                if (resultMsg === 'success') {
                    resBody.success(data)
                } else {
                    resBody.error('fail from rpc server')
                }

            }
        } else {
            resBody.error('invalid request body')
        }

        res.send(resBody.json());
    });

    // member 조회
    router.get('/', async (req, res) => {
        const resBody = new ResponseBody();
        const isValid = await validate(req.body)
            .notNull()
            .jsonKeys([
                'username',
                'password',
            ])

        if (isValid) {
            const member = (await rpc.request({
                method: 'readDB',
                params: [req.body.username]
            })).result;

            if(member){
                if (req.body.username === member.username && req.body.password === member.password) {
                    delete member['password']
                    resBody.success(member);
                } else {
                    resBody.error('incorrect username or password ')
                }
            } else {
                resBody.error('not exists');
            }

        } else {
            resBody.error('invalid request body')
        }

        res.send(resBody.json());
    
    });

    // member 수정
    router.put('/', async (req, res) => {

        const resBody = new ResponseBody();
        const isValid = await validate(req.body)
            .notNull()
            .jsonKeys([
                'username',
                'password',
            ])

        if (isValid) {
            const member = (await rpc.request({
                method: 'readDB',
                params: [req.body.username]
            })).result;

            if(member){
                if (req.body.username === member.username && req.body.password === member.password) {
                    if(req.body.newPassword){
                        req.body.password = req.body.newPassword;
                        delete req.body.newPassword;
                    }
    
                    const data = {
                        ...member,
                        ...req.body,
                        updatedDate: new Date()
                    };
    
                    const resultMsg = (await rpc.request({
                        method: 'updateDB',
                        params: [
                            req.body.username,
                            data
                        ]
                    })).result;
    
                    if (resultMsg === 'success') {
                        resBody.success(resultMsg)
                    } else {
                        resBody.error('fail from rpc server')
                    }
                    
                } else {
                    resBody.error('incorrect username or password ')
                }
            } else {
                resBody.error('not exists');
            }

        } else {
            resBody.error('invalid request body')
        }

        res.send(resBody.json());
    });


    // member 삭제
    router.delete('/', async (req, res) => {

        const resBody = new ResponseBody();
        const isValid = await validate(req.body)
            .notNull()
            .jsonKeys([
                'username',
                'password',
            ])

        if (isValid) {
            const member = (await rpc.request({
                method: 'readDB',
                params: [req.body.username]
            })).result;

            if(member){
                const resultMsg = (await rpc.request({
                    method:'removeDB',
                    params:[req.body.username]
                })).result;

                if (resultMsg === 'success') {
                    resBody.success(resultMsg)
                } else {
                    resBody.error('fail from rpc server')
                }
            } else {
                resBody.error('not exists');
            }

        } else {
            resBody.error('invalid request body')
        }

        res.send(resBody.json());
    });

    return router
}