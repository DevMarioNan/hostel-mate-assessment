import Navbar from "./Navbar"
import NotesList from "./NotesList"
const Homepage = () => {
  return (
    <div>
        <Navbar />
        <div style={{ padding: '20px' }}>
          
            <NotesList />
        </div>
    </div>
  )
}

export default Homepage
