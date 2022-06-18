const {faker} = require("@faker-js/faker")
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const bools = [true, false];
const roles = ['AUTHOR', 'ADMIN'];
const categories = [];
const articles = [];
const users = [];

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

async function main() {
    await prisma.utilisateur.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();

    // 10 utilisteurs author
    for (let i = 1; i <= 10; i++) {
        const user = {
            id: i,
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
            role: roles[0]
        }
        users.push(user.id);
        await prisma.utilisateur.create({
            data: user
        });
    }
    // 1 Admin
    await prisma.utilisateur.create({
        data: {
            id: -1,
            nom: faker.name.findName().toUpperCase() + ' ' + faker.name.findName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
            role: roles[1]
        },
    });
    // 10 categories
    for (let i = 1; i <= 10; i++) {
        const cat = {id: i, nom: faker.lorem.word().toUpperCase()};
        if (categories.length < 4) {
            categories.push(cat.id)
        }

        await prisma.categorie.create({
            data: cat
        });
    }

    // 100 articles
    for (let i = 1; i <= 100; i++) {
        const article = {
            id: i, titre: faker.random.words(4), contenu: faker.lorem.paragraph(), image: null,
            authorId: users[Math.floor(Math.random() * categories.users)],
            published: bools[Math.floor(Math.random() * bools.length)],
            categoryId: categories[Math.floor(Math.random() * categories.length)]
        };
        articles.push(article.id);

        await prisma.article.create({
            data: article
        });
    }

    // 0 à 20 commentaires pour chaque article
    let commentsCount = 0;

    for (let i = 1; i <= 100; i++) {
        const commentaire = {
            email: faker.internet.email(), contenu: faker.random.words(10), articleId: i
        };
        const randomNumberOfComments = randomNumber(0, 20)


        for (let j = 0; j <= randomNumberOfComments; j++) {
            commentaire.id = commentsCount++;
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