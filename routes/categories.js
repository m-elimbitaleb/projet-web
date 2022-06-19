import {userAuthenticated} from "../middlewares/auth/auth-middleware";

var express = require('express');
var router = express.Router();

router.get('/', [userAuthenticated], async function (req, res, next) {
    res.send('categories');
});

module.exports = router;
