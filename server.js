const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
  { id: 1, title: 'Belajar Back End', completed: false },
  { id: 2, title: 'Merapikan kamar', completed: true },
  { id: 3, title: 'Nyapu', completed: false },
];

app.get('/', (req, res) => {
  res.send('Halo! Server To-Do API sudah berjalan.');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title harus diisi.' });
  }

  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);
  const newTodo = {
    id: maxId + 1,
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json({
    message: 'Tugas berhasil ditambahkan!',
    data: newTodo,
  });
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({ message: 'ID tidak valid.' });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    return res.json({ message: `Tugas dengan ID ${todoId} berhasil dihapus.` });
  }

  res.status(404).json({ message: 'Tugas tidak ditemukan!' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});