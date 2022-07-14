const router = require('express').Router();

module.exports = {
    routers,
    path: "/member",
}

function routers() {

    // member 생성
    router.get('/:username',(req, res) => {
        const memory = req.app.get("memory");
        req.app.set(`${req.params.username}`, memory)
        res.send("hello")
    });

    router.get('/get', (req, res) => {
        console.log(req.app.get("hhh"))
    })

    return router
}