const router = require('express').Router();

module.exports = {
    routers,
    path: "/api/v1/member",
}

function routers() {

    // 전체보기
    router.get('/',(req, res) => {
        
    });

    return router
}

