const {Router} = require('express');
const {getNotes, createNote, updateNote, deleteNote, reorderNotes} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const noteRoutes = Router();
noteRoutes.get('/', authMiddleware, getNotes);
noteRoutes.post('/', authMiddleware, createNote);
noteRoutes.put('/:id', authMiddleware, updateNote);
noteRoutes.delete('/:id', authMiddleware, deleteNote);
noteRoutes.post('/reorder', authMiddleware, reorderNotes);

module.exports = noteRoutes;