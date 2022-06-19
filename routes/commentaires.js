import {userAuthenticated} from "../middlewares/auth/auth-middleware";

var express = require('express');
var router = express.Router();

router.get('/', [userAuthenticated], function(req, res, next) {
    res.send('commentaires');
});

module.exports = router;
