import { useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box} from "@mui/material";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <AppBar position="static" color="white">
      <Toolbar>
        <Box sx={{
            margin: '0 auto',
            width: '100%',
            maxWidth: '800px',  
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'row', sm: 'row' }, 
        }}>
          {/* Left-aligned text */}
          <Typography variant="h6" component="div" noWrap>
            Notes Taking App
          </Typography>

          {/* Right-aligned logout button */}
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto' , backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'rgb(185, 0, 0)' } }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
