import express, { json } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        console.log('Body recebido:', req.body);
        const { name, email, age } = req.body;

        const user = await prisma.user.create({
            data: { name, email, age }
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error when searching for users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
