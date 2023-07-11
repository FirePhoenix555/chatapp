// https://rapidapi.com/blog/nodejs-express-rest-api-example/
// https://www.geeksforgeeks.org/express-js-router-route-function/

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

app.use(require('cors')({
    origin: '*' // TODO change this so you're not allowing all requests
}));

app.use(express.json());

function findMessagesByRecipient(data, uid) {
    let a = [];

    Object.values(data).forEach(val => {
        if (val.to == uid) a.push(val);
    });

    return a;
}

async function getMessage(id, res, type) {
    let data = JSON.parse(fs.readFileSync('data/messages.json'));

    let message;
    if (type == "mid") message = data[id];
    else if (type == "uid") message = findMessagesByRecipient(data, id);

    if (!message) return sendError('Message not found', 404, res);

    res.json(message);
    res.end();
}

async function getUser(id, res) {
    let data = JSON.parse(fs.readFileSync('data/users.json'));

    const user = data[id];
    if (!user) return sendError('Invalid user', 404, res);

    res.json(user);
    res.end();
}

async function addUser(req, res, next) {
    let data;
    try { data = JSON.parse(fs.readFileSync('data/users.json')); }
    catch { return sendError('Could not access users database', 404, res) }
    if (!data) return sendError('Could not access users database', 404, res)

    const id = (Object.keys(data).length + 1).toString().padStart(5, '0');
    const user = {
        id: id,
        name: req.body.user,
        phash: req.body.pass
    };

    data[id] = user;

    fs.writeFileSync('data/users.json', JSON.stringify(data));

    res.status(201).json(user);
}

router.route('/api/v1/messages/id/:mid').get((req, res, next) => getMessage(req.params.mid, res, "mid"));
router.route('/api/v1/users/:uid').get((req, res, next) => getUser(req.params.uid, res));
router.route('/api/v1/messages/usr/:uid').get((req, res, next) => getMessage(req.params.uid, res, "uid"));
router.route('/api/v1/users/').post(addUser);

app.use(router);

app.use((req, res, next) => {
    return sendError(`${req.method} ${req.url} Not Found`, 404, res)
});

function sendError(msg, status, res) {
    res.status(status);
    // console.error(new Error(msg));
    res.json({
        error: {
            message: msg
        },
    });
}