import {
    userIsAuthor,
    userIsAuthorOrAdmin,
    userIsOwnerOfArticle, userIsOwnerOrAdmin,
    userAuthenticated
} from "../middlewares/auth/auth-middleware";

var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', [userAuthenticated], async function (req, res, next) {
    try {
        const articles = await prisma.article.findMany()
        return res.status(200).send(articles);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', [userAuthenticated], async (req, res, next) => {
    try {
        const id = req.params.id;
        const article = await prisma.article.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.status(200).send(article);
    } catch (error) {
        next(error)
    }
});

router.post('/', [userAuthenticated, userIsAuthor], async (req, res, next) => {
    try {
        req.body.authorId = parseInt(req.body.authorId);
        req.body.categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : null;
        let {titre, contenu, image, published, authorId, categoryId} = req.body
        const article = await prisma.article.create({
            data: {
                titre, contenu, image, published, authorId, categoryId
            }
        })
        return res.status(200).send(article)
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.delete('/:id', [userAuthenticated, userIsOwnerOrAdmin], async (req, res, next) => {
    try {
        const id = req.params.id;
        const article = await prisma.article.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).send(article)
    } catch (error) {
        next(error)
    }
});

router.patch('/', [userAuthenticated, userIsAuthor, userIsOwnerOfArticle], async (req, res, next) => {
    try {
        let {
            id, titre, contenu, image, published, categoryId
        } = req.body
        const article = await prisma.article.update({
            where: {
                id: Number(id)
            },
            data: {
                titre, contenu, image, published, categoryId
            }
        })
        return res.status(200).send(article)
    } catch (error) {
        console.log(error)
        next(error)
    }
});

module.exports = router;

