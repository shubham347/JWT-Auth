require('dotenv').config();
const http = require('http');
const express = require('express');
const routes = require('./routes');
const app = express();
app.use(express.json());

// const app = require('./app');
app.use("/", routes);
const { APP_PORT } = process.env;
const port = process.env.PORT || APP_PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server starts listening on port ${port}`)
});