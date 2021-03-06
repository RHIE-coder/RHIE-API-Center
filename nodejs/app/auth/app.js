const express = require('express');
const app = express();
const http = require('http')
const path = require('path');
const serverConfig = require('../../common/config/auth-server');
const cookieParser = require('cookie-parser');
const router_loader = require('./routes/route_loader');

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


// Running Server
http.createServer(app).listen(serverConfig.PORT, serverConfig.HOST, () => {
    console.log(`app listening at https://localhost:${serverConfig.PORT}`);
});
