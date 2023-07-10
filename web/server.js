require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const http = require('http');
const server = http.createServer(app);

app.use("/", express.static("public/"));

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
})