const {userAuthenticated} = require("../middlewares/auth/auth-middleware");
var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const {userIsAdmin} = require("../middlewares/auth/auth-middleware");


router.get('/', [userAuthenticated], async function (req, res, next) {
    try {
        const take = req.query.take ? Number(req.query.take) : 100;
        const skip = req.query.skip ? Number(req.query.skip) : 0;
        const categories = await prisma.categorie.findMany({
            take, skip,
            orderBy: [{createdAt: 'desc'}]
        })
        const groupBy = await prisma.categorie.groupBy({
            by: ['categoryId'],
            _count: {
                categoryId: true,
            }
        })
        return res.status(200).send(categories.map(it => {
            it.categorieCount = groupBy.find(c => c.categoryId === it.id)?._count?.categoryId || 0;
            return it;
        }));
    } catch (error) {
        next(error)
    }
})


router.get('/:id', [userAuthenticated], async (req, res, next) => {
    try {
        const id = req.params.id;
        const categorie = await prisma.categorie.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.status(200).send(categorie);
    } catch (error) {
        next(error)
    }
});

router.post('/', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        req.body.authorId = parseInt(req.body.authorId);
        req.body.categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : null;
        let {titre, contenu, image, published, authorId, categoryId} = req.body
        const categorie = await prisma.categorie.create({
            data: {
                titre, contenu, image, published, authorId, categoryId
            }
        })
        return res.status(200).send(categorie)
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.delete('/:id', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        const id = req.params.id;
        const categorie = await prisma.categorie.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).send(categorie)
    } catch (error) {
        next(error)
    }
});

router.patch('/', [userAuthenticated, userIsAdmin], async (req, res, next) => {
    try {
        let {
            id, titre, contenu, image, published, categoryId
        } = req.body
        const categorie = await prisma.categorie.update({
            where: {
                id: Number(id)
            },
            data: {
                titre, contenu, image, published, categoryId
            }
        })
        return res.status(200).send(categorie)
    } catch (error) {
        console.log(error)
        next(error)
    }
});


module.exports = router;
