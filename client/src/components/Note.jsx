import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText
} from '@mui/material';
import axios from 'axios';

const Note = ({ id, title: initialTitle, content: initialContent, fetchNotes }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);


  const [displayTitle, setDisplayTitle] = useState(initialTitle);
  const [displayContent, setDisplayContent] = useState(initialContent);

  
  const [editTitle, setEditTitle] = useState(initialTitle);
  const [editContent, setEditContent] = useState(initialContent);

  const handleEditOpen = () => {
    
    setEditTitle(displayTitle);
    setEditContent(displayContent);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      
      setDisplayTitle(editTitle);
      setDisplayContent(editContent);
    } catch (error) {
      console.error('Error saving note:', error);
    }

    handleEditClose();
  };

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      fetchNotes(); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }

    handleDeleteClose();
  };

  return (
    <>
      
      <Card sx={{ mb: 2, width: "100%", display: 'flex', justifyContent: "space-between" }} variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            {displayTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {displayContent}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditOpen} color="primary">
            Edit
          </Button>
          <Button size="small" onClick={handleDeleteOpen} color="error">
            Delete
          </Button>
        </CardActions>
      </Card>


      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Note;