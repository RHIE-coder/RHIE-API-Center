const router = require('express').Router();

module.exports = {
    routers,
}

function routers() {

    // 메인 페이지
    router.get('/',(req, res) => {
        res.render("home.html")
    });

    return router
}

