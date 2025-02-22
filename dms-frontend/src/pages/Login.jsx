import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import api  from '../utils/api'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const GlassContainer = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const Background = styled(Box)({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFFFFF",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
  },
});

const LoginButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: "30px",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: "48px",
  padding: "0 30px",
  marginTop: "20px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
   
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      // Send login request to backend
      const val = await api.post("/auth/login", { email: formData.email, password: formData.password });
      if(val.data.isLoggedin){
        setLoading(val.data.isLoggedin);
        login(val.data.name); // Set user globally
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <Background>
      <Container maxWidth="sm">
        <GlassContainer>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "#FFFFFF", textAlign: "center", mb: 3 }}
          >
            DMS Login
          </Typography>
          <form onSubmit={handleLogin}>
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser color="#FFFFFF" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock color="#FFFFFF" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#FFFFFF" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoginButton
              type="submit"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Signing in..." : "Sign In"}
            </LoginButton>
          </form>
        </GlassContainer>
      </Container>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Background>
  );
};

export default Login;