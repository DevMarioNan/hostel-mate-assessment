import { useState } from 'react'
import {
    Container,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email is invalid");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post('http://localhost:5000/api/auth/register', { email, password }).then((response) => {
            if (response.data) {
                setError(null);
                navigate('/login'); 
            } else {
                setError(response.data.message || "Registration failed");
            }
        }
        ).catch((err) => {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred during registration");
        });
        setError(null); 
    }
    

    
  return (
    <Container component="main" maxWidth="xs">
        
        <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2, textAlign: 'center' } }>
            Register
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Register
            </Button>
            <Typography variant="body2" color="textSecondary" align="center">
                Already have an account? <a href="/login">Login</a>
            </Typography>

        </form>
      
    </Container>
  )
}

export default RegisterForm
