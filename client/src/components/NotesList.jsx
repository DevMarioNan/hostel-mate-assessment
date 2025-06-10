import { useEffect, useState } from "react"
import Note from "./Note"
import axios from "axios"
import { Box } from "@mui/material"
const NotesList = () => {
    const [notes, setNotes] = useState([])
    const fetchNotes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/notes", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setNotes(response.data)
            console.log(response.data);
        } catch (err) {
            console.log(err.response?.data?.message || "Failed to fetch notes");
        }
    }
    useEffect(() => {
        fetchNotes()
    }, [])


  return (
    <Box sx={{ display: 'flex', flexDirection: "column" , justifyContent: "center", alignItems: 'center', mt: 4, maxWidth: '800px', width: '100%', margin: '0 auto' }}>
      {notes.map((note) => (
        <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            fetchNotes={fetchNotes}
        />
      ))}

      
    </Box>
  )
}

export default NotesList
