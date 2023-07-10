// https://rapidapi.com/blog/nodejs-express-rest-api-example/
// https://www.geeksforgeeks.org/express-js-router-route-function/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

const getStats = async (req, res, next) => {
    try {
        const stats = {a:1,b:2};
        res.json(stats);
        res.end();
    } catch (e) {
        next(e);
    }
};

router.route('/api/v1/stats/:id').get(getStats);

app.use(router);