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

async function getMessage(req, res, next) {
    let mid = req.params.mid;
    let data = JSON.parse(fs.readFileSync('data/messages.json'));

    const message = data[mid];
    if (!message) return sendError('Message not found', 404, res);

    res.json(message);
    res.end();
}

async function getUser(req, res, next) {
    let uid = req.params.uid;
    let data = JSON.parse(fs.readFileSync('data/users.json'));

    const user = data[uid];
    if (!user) return sendError('Invalid user', 404, res);

    res.json(user);
    res.end();
}

router.route('/api/v1/messages/id/:mid').get(getMessage);
router.route('/api/v1/users/:uid').get(getUser);

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