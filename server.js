const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
    { id: 1, title: "Belajar Back End", completed: false },
    { id: 2, title: "Merapikan kamar", completed: true }
];

// GET: Mengecek server
app.get('/', (req, res) => {
    res.send('Halo! Server To-Do API sudah berjalan.');
});

// GET: Mengambil semua tugas
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST: Menambah tugas baru
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json({ 
        message: "Tugas berhasil ditambahkan!", 
        data: newTodo 
    });
});

// PUT: Mengubah tugas
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (todo) {
        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }
        res.json({ 
            message: `Tugas dengan ID ${todoId} berhasil diperbarui!`, 
            data: todo 
        });
    } else {
        res.status(404).json({ message: "Tugas yang ingin diubah tidak ditemukan!" });
    }
});

// DELETE: Menghapus tugas
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.json({ message: `Tugas dengan ID ${todoId} berhasil dihapus.` });
    } else {
        res.status(404).json({ message: "Tugas tidak ditemukan!" });
    }
});

// Menyalakan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});