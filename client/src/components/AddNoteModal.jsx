import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box
} from '@mui/material';
import axios from 'axios';

const AddNoteModal = ({ onNoteAdded, notesLength }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setContent('');
    };

    const handleSave = async () => {
        if (!title || !content) {
            setError('Title and content are required.');
            return;
        }


        try {
            await axios.post(
                'http://localhost:5000/api/notes',
                {
                    title,
                    content,
                    order: notesLength 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then((res) => onNoteAdded(res.data));

            handleClose();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault(); 
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2, alignSelf: 'flex-start' }}>
                Add New Note
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off" onKeyDown={handleKeyDown}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={(e) => {setTitle(e.target.value); setError('');} }
                        />
                        <TextField
                            margin="dense"
                            label="Content"
                            fullWidth
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => {setContent(e.target.value); setError('');}}
                        />
                        {error && (
                            <Box sx={{ color: 'red', mt: 2 }}>
                                {error}
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddNoteModal;