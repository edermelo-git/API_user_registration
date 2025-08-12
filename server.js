import express, { json } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { join } from '@prisma/client/runtime/library';

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
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
