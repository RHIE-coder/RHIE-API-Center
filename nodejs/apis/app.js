const express = require('express');
const app = express();
const http = require('http')
const path = require('path');
const serverConfig = require('./config/server');
const cookieParser = require('cookie-parser');
const router_loader = require('./routes/route_loader');
const { MemoryDB } = require("./database/memory");

// View Setting
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// Favicon & Static
app.use('/static', express.static(path.join(__dirname, 'public')));

// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Request Logging on Console
app.use("/", (req, res) => {
    console.log({
        method: req.method,
        url: req.url,
        ip: req.ip,
    });
    req.next()
});

// Router Mapping
router_loader.init(app);

// Member DB Setting
app.set("memory", new MemoryDB())

// Running Server
http.createServer(app).listen(serverConfig.port, () => {
    console.log(`app listening at https://localhost:${serverConfig.port}`);
});
