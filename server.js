import express from 'express';
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
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.get('/users', (req, res) => {
  res.send('Lista de usuários');
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
