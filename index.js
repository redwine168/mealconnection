const path = require("path");
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const sql = require('mssql');

// Additional setup and initialization
const app = express();
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
const server = http.createServer(app);
const port = process.env.PORT || 1337;
const publicDirectoryPath = path.join(__dirname, 'public/')
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
var config = {
    user: 'mealconnectionadmin',
    password: 'ifoundaway2020!',
    server: 'mealconnectiondb.database.windows.net',
    database: 'mealconnectiondb'
};

// Set folders for html, css, and js files
app.set('views', path.join(__dirname, '../public/views'))


// GET for landing page
app.get('/', function(req, res) {
    console.log("Request for landing page");
    res.sendFile(publicDirectoryPath + 'views/landingPage.html');
})

// GET for restaurant page
app.get('/restaurant', function(req, res) {
    console.log("Request for restaurant page");
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from Hospitals', function (err, recordset) {
            if (err) console.log(err);
            console.log(recordset);
        })
    })
    res.sendFile(publicDirectoryPath + 'views/restaurant.html');
})

// GET for hospital page
app.get('/hospital', function(req, res) {
    console.log("Request for hospital page");
    res.sendFile(publicDirectoryPath + 'views/hospital.html');
})

//This server is running through the port 1337
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
});