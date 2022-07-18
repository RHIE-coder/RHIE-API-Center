const router = require('express').Router();

const renderList = require("fs").readdirSync(require("path").join("..","..","views"))

module.exports = {
    routers,
}

function routers() {

    for(let i = 0; i < renderList.length; i++){
        console.log(renderList[i])
    }

    return router
}

