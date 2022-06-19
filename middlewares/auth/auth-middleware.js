
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../../utils/auth-utils");
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient();

const userAuthenticated = (req, res, next) => {
    let header = req.headers["authorization"];

    if (!header || header.split(" ").length !== 2) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    const token = header.split(" ")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized!"
            });
        }
        req.decodedToken = decoded;
        next();
    });
};

const userIsAdmin = (req, res, next) => {

    if (req.decodedToken.role === "ADMIN") {
        next();
        return;
    }

    res.status(403).send({
        message: "Require Admin Role!"
    });
};

const userIsAuthor = (req, res, next) => {

    if (req.decodedToken.role === "AUTHOR") {
        next();
        return;
    }

    res.status(403).send({
        message: "Require Author Role!"
    });
};
const userIsAuthorOrAdmin = (req, res, next) => {

    if (req.decodedToken.role === "AUTHOR" || req.decodedToken.role === "ADMIN"
    ) {
        next();
        return;
    }

    res.status(403).send({
        message: "Require Author/Admin Role!"
    });
};

const userIsOwnerOfArticle = async (req, res, next) => {

    const connectedUserId = Number(req.decodedToken.id);
    const articleId = req.params.id || req.body.id;
    const article = await prisma.article.findUnique({
        where: {
            id: Number(articleId),
        }
    })
    if (article.authorId === connectedUserId) {
        next();
        return;
    }

    res.status(403).send({
        message: "Require Owner to patch"
    });
};

const userIsOwnerOrAdmin = async (req, res, next) => {

    if (req.decodedToken.role === "ADMIN") {
        next();
        return;
    }
    return userIsOwnerOfArticle(req, res, next);

}


module.exports = {
    userAuthenticated, userIsAdmin, userIsAuthor, userIsAuthorOrAdmin, userIsOwnerOfArticle, userIsOwnerOrAdmin
};
