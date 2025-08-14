import express, { json } from 'express';
import { Prisma, PrismaClient } from '../generated/prisma/index.js';

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

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, age } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.id !== id)
      return res.status(400).json({ error: 'Email already in use.' });

    const user = await prisma.user.update({ where: { id }, data: { email, name, age } });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));