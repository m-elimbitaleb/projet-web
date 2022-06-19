const {userAuthenticated} = require("../middlewares/auth/auth-middleware");
var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


router.get('/', [userAuthenticated], async function (req, res, next) {
    try {
        const take = req.query.take ? Number(req.query.take) : 100;
        const skip = req.query.skip ? Number(req.query.skip) : 0;
        const commentaires = await prisma.commentaire.findMany({
            take, skip,
            orderBy: [{createdAt: 'desc'}]
        })

        return res.status(200).send(commentaires);
    } catch (error) {
        next(error)
    }
})


router.get('/:id', [userAuthenticated], async (req, res, next) => {
    try {
        const id = req.params.id;
        const commentaire = await prisma.commentaire.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.status(200).send(commentaire);
    } catch (error) {
        next(error)
    }
});

router.post('/', [userAuthenticated], async (req, res, next) => {
    try {
        req.body.articleId = req.body.articleId ? parseInt(req.body.articleId) : null;
        let {contenu, email, articleId} = req.body
        const commentaire = await prisma.commentaire.create({
            data: {contenu, email, articleId}
        })
        return res.status(200).send(commentaire)
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.delete('/:id', [userAuthenticated], async (req, res, next) => {
    try {
        const id = req.params.id;
        const commentaire = await prisma.commentaire.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).send(commentaire)
    } catch (error) {
        next(error)
    }
});

router.patch('/', [userAuthenticated], async (req, res, next) => {
    try {
        let {
            id, contenu
        } = req.body
        const commentaire = await prisma.commentaire.update({
            where: {
                id: Number(id)
            },
            data: {
                contenu
            }
        })
        return res.status(200).send(commentaire)
    } catch (error) {
        console.log(error)
        next(error)
    }
});


module.exports = router;
