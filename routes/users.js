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
    const take = req.query.take ? Number(req.query.take) : 100;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const users = await prisma.utilisateur.findMany({
        take, skip,
        orderBy: [{createdAt: 'desc'}]
    })

    return res.status(200).send(users.map(it => {
        it.password = null;
        return it;
    }));
});

router.get('/:id', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.status(200).send({...user, password: null});
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await prisma.utilisateur.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).send({...user, password: null})
    } catch (error) {
        next(error)
    }
});

router.patch('/', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        let {
            nom, email, role
        } = req.body
        const user = await prisma.utilisateur.update({
            where: {
                id: Number(id)
            },
            data: {
                nom, email, role
            }
        })
        return res.status(200).send({...user, password: null})
    } catch (error) {
        console.log(error)
        next(error)
    }
});

module.exports = router;

