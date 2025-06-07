const {Router} = require('express');
const {getNotes, createNote, updateNote, deleteNote} = require('../controllers/noteController');
const {authenticate} = require('../middleware/authMiddleware');

const noteRoutes = Router();
noteRoutes.get('/', authenticate, getNotes);
noteRoutes.post('/', authenticate, createNote);
noteRoutes.put('/:id', authenticate, updateNote);
noteRoutes.delete('/:id', authenticate, deleteNote);

module.exports = noteRoutes;