const {PrismaClient} = require('../generated/prisma');

const {z} = require('zod');
const prisma = new PrismaClient();

const noteSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    userId: z.number().int().positive(),
    order: z.number().int().nonnegative().optional()
});

const FetchNotes = async (userId) => {
    try {
        const notes = await prisma.note.findMany({
            where: {userId: userId},
            orderBy: {order: 'asc'}
        });
        return notes;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch notes');
    }
}

const CreateOneNote = async (title, content, userId,order) => {
    try {
        const validatedData = noteSchema.parse({title, content, userId, order});
        const newNote = await prisma.note.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                userId: validatedData.userId,
                order: validatedData.order || 0 
            }
        });
        return newNote;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {error: error.errors};
        }
        console.error(error);
        throw new Error('Failed to create note');
    }
}

const UpdateOneNote = async (id, title, content, userId) => {
    
    try {
        const note = await prisma.note.findUnique({
            where: {id: parseInt(id)}
        });
        if (!note ) {
            return {error: 'Note not found'};
        }
        if (note.userId !== userId) {
            return {error: 'You do not have permission to update this note'};
        }

        const validatedData = noteSchema.parse({title, content, userId});
        const updatedNote = await prisma.note.update({
            where: {id: parseInt(id)},
            data: {
                title: validatedData.title,
                content: validatedData.content,
                userId: validatedData.userId
            }
        });
        return updatedNote;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {error: error.errors};
        }
        console.error(error);
        throw new Error('Failed to update note');
    }
}

const DeleteOneNote = async (id, userId) => {
    try {
        const note = await prisma.note.findUnique({
            where: {id: parseInt(id)}
        });
        if (!note ) {
            return {error: 'Note not found'};
        }
        if (note.userId !== userId) {
            return {error: 'You do not have permission to delete this note'};
        }
        await prisma.note.delete({
            where: {id: parseInt(id)}
        });
        return {message: 'Note deleted successfully'};
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete note');
    }
}


module.exports = {
    FetchNotes,
    CreateOneNote,
    UpdateOneNote,
    DeleteOneNote
};
