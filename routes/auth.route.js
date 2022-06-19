
var express = require('express');
const jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

const {jwtSecret} = require("../utils/auth-utils");
const {jwtExpringDuration} = require("../utils/auth-utils");

var router = express.Router();

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/token', async function (req, res, next) {

    let user;
    try {
        user = await prisma.utilisateur.find({
            where: {
                email: req.body.email
            }
        })
    } catch (error) {
        res.status(403).send({message: "UnAuthorized"});
        return;
    }

    if (!user) {
        return res.status(403).send({
            accessToken: null, message: "Unauthorized"
        });
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(403).send({
            accessToken: null, message: "Unauthorized"
        });
    }

    const token = jwt.sign({id: user.id, email: user.email, role: user.role}, jwtSecret, {
        expiresIn: jwtExpringDuration
    });

    res.status(200).send({
        accessToken: token
    });


});

module.exports = router;

