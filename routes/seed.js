var express = require('express');
var router = express.Router();
var {faker} = require("@faker-js/faker")
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient();

var bcrypt = require("bcryptjs");

const roles = ['AUTHOR', 'ADMIN'];

function getRandomName() {
    return faker.random.word().toUpperCase()
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function seed() {
    await prisma.utilisateur.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();

    // 1 Admin
    const adminEmail = "admin@dwm.com";
    await prisma.utilisateur.create({
        data: {
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: adminEmail,
            password: bcrypt.hashSync(adminEmail),
            role: roles[1]
        },
    });
    // 10 utilisteurs author
    for (var i = 1; i <= 10; i++) {
        const userEmail = faker.internet.email();
        var user = {
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: userEmail,
            password: bcrypt.hashSync(userEmail),
            role: roles[0]
        }
        await prisma.utilisateur.create({
            data: user
        })
    }
    // 10 categories
    for (var i = 1; i <= 10; i++) {
        var cat = {nom: getRandomName()};

        var savedCat = await prisma.categorie.create({
            data: cat
        });

    }

    // 100 articles
    for (var i = 1; i <= 100; i++) {
        var article = {
            titre: faker.random.words(4), contenu: faker.random.words(3), image: null,
            authorId: randomNumber(2, 11),
            published: randomNumber(0, 1) === 1,
            categoryId: randomNumber(1, 4)
        };
        await prisma.article.create({
            data: article
        })
    }

    // 0 à 20 commentaires pour chaque article

    for (var i = 1; i < 100; i++) {
        var commentaire = {
            email: faker.internet.email(), contenu: faker.random.words(10), articleId: i
        };
        var randomNumberOfComments = randomNumber(0, 20)


        for (var j = 0; j <= randomNumberOfComments; j++) {
            await prisma.commentaire.create({
                data: commentaire
            });
        }
    }


}

router.get('/', async function (req, res, next) {
    await seed();
    res.send('SEED OK');
});

module.exports = router;
