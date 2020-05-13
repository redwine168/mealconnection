const path = require("path")
const express = require('express')
const http = require('http');
const bodyParser = require('body-parser')
const url = require('url')

// Additional setup and initialization
const app = express()
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
const server = http.createServer(app)
const port = process.env.PORT || 1337;
const publicDirectoryPath = path.join(__dirname, '../public/')
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../public/views'))

// Landing page for the app
app.get('/', function (req, res) {
    res.sendFile(publicDirectoryPath + 'views/landingPage.html');
})

//This server is running through the port 3000
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
});