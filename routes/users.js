const {userAuthenticated, userIsAdmin} = require("../middlewares/auth/auth-middleware");

var express = require('express');
var router = express.Router();

var bcrypt = require("bcryptjs");

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/', [userAuthenticated, userIsAdmin], async function (req, res, next) {
    try {
        let {
            nom, email, password, role
        } = req.body;

        password = bcrypt.hashSync(password)
        const user = await prisma.utilisateur.create({
            data: {
                nom, email, password, role
            }
        })
        return res.status(200).send({...user, password: null});
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/', [userAuthenticated, userIsAdmin], async function (req, res, next) {
    const users = await prisma.product.findMany().map(it => {
        it.password = null;
        return it;
    });
    return res.status(200).send(users);
});

module.exports = router;

