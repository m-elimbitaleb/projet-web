const {faker} = require("@faker-js/faker")
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const bools = [true, false];
const roles = ['AUTHOR', 'ADMIN'];

function getRandomName() {
    return faker.random.word().toUpperCase()
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function main() {
    await prisma.utilisateur.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();

    // 1 Admin
    await prisma.utilisateur.create({
        data: {
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
            role: roles[1]
        },
    });

    // 10 utilisteurs author
    for (let i = 1; i <= 10; i++) {
        const user = {
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
            role: roles[0]
        }
        await prisma.utilisateur.create({
            data: user
        })
    }
    // 10 categories
    for (let i = 1; i <= 10; i++) {
        const cat = {nom: getRandomName()};

        const savedCat = await prisma.categorie.create({
            data: cat
        });

    }

    // 100 articles
    for (let i = 1; i <= 100; i++) {
        const article = {
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

    for (let i = 1; i < 100; i++) {
        const commentaire = {
            email: faker.internet.email(), contenu: faker.random.words(10), articleId: i
        };
        const randomNumberOfComments = randomNumber(0, 20)


        for (let j = 0; j <= randomNumberOfComments; j++) {
            await prisma.commentaire.create({
                data: commentaire
            });
        }
    }

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })