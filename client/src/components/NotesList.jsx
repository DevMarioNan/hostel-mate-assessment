import  { useEffect, useState } from "react";
import Note from "./Note";
import axios from "axios";
import { Box } from "@mui/material";
import AddNoteModal from "./AddNoteModal";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleNoteAdded = (newNote) => {
        setNotes((prev) => [ ...prev, newNote]);
    };

    const fetchNotes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/notes", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setNotes(response.data);
        } catch (err) {
            console.log(err.response?.data?.message || "Failed to fetch notes");
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        const oldIndex = notes.findIndex((note) => note.id === active.id);
        const newIndex = notes.findIndex((note) => note.id === over.id);

        const updatedNotes = arrayMove(notes, oldIndex, newIndex);

        try {
            await axios.post(
                'http://localhost:5000/api/notes/reorder',
                {
                    updatedOrder: updatedNotes.map((note, index) => ({
                        id: note.id,
                        order: index,
                    })),
                    userId: updatedNotes[0]?.userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error reordering notes:', error);
            
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center',
                mt: 4,
                maxWidth: '800px',
                width: '100%',
                margin: '0 auto'
            }}
        >
            <AddNoteModal onNoteAdded={handleNoteAdded} notesLength={notes.length} />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={notes.map(note => note.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {notes.map((note) => (
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            fetchNotes={fetchNotes}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    );
};

export default NotesList;