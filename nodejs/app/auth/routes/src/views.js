const router = require('express').Router();

const renderList = require("fs").readdirSync(require("path").join(__dirname, "..","..","views"))

module.exports = {
    routers,
}

function routers() {

    for(let i = 0; i < renderList.length; i++){
        const pageName = renderList[i].split(".")[0];
        if(pageName === "index") {
            router.get(`/`, (req, res) => { res.render(pageName) })
        } else {
            router.get(`/${renderList[i].split(".")[0]}`, (req, res) => { res.render(pageName) })
        }

    }

    return router
}

