const {FetchNotes, CreateOneNote, UpdateOneNote, DeleteOneNote} = require('../services/noteServices');
const {PrismaClient} = require('../generated/prisma');

const prisma = new PrismaClient();

const getNotes = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await FetchNotes(userId);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to fetch notes'});
    }
}
const createNote = async (req, res) => {
    const {title, content} = req.body;
    const userId = req.userId;

    if (!title || !content) {
        return res.status(400).json({message: 'Title and content are required'});
    }

    try {
        const newNote = await CreateOneNote(title, content, userId);
        if (newNote.error) {
            return res.status(400).json({message: newNote.error});
        }
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to create note'});
    }
}
const updateNote = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const userId = req.userId;

    if (!title || !content) {
        return res.status(400).json({message: 'Title and content are required'});
    }

    try {
        const updatedNote = await UpdateOneNote(id, title, content, userId);
        if (updatedNote.error) {
            return res.status(400).json({message: updatedNote.error});
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to update note'});
    }
}
const deleteNote = async (req,res) => {
    const {id} = req.params;
    const userId = req.userId;

    try {
        const deletedNote = await DeleteOneNote(id, userId);
        if (deletedNote.error) {
            return res.status(400).json({message: deletedNote.error});
        }
        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to delete note'});
    }
}

const reorderNotes = async (req, res) => {
    const data = req.body;
    const {updatedOrder} = data;
    const userId = req.userId;
    try{
        await prisma.$transaction(
            updatedOrder.map((note) => {
                if (data.userId !== userId) {
                    throw new Error('You do not have permission to reorder these notes');
                }
                return prisma.note.update({
                    where: {id: note.id},
                    data: {order: note.order}
                });
            })
        );
        res.status(200).json({message: 'Notes reordered successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to reorder notes'});
    }
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    reorderNotes
};