import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './PageLayout.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const PageLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { icon: <DescriptionIcon />, text: 'My Documents' },
    { icon: <SettingsIcon />, text: 'Document Settings' },
  ];

  const handleLogout = async () => {
    await logout(); // Call the logout function
    navigate("/login"); // Redirect to login page
    };

  return (
    <div className="page-layout page-background">
      {/* Header */}
      <AppBar position="fixed" className="header">
        <Toolbar className="header-bar">
          <IconButton
            color="inherit"
            onClick={() => setOpen(!open)}
            edge="start"
            className="header-menu-btn"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="header-title">
            File DMS
          </Typography>
          <Box className="header-user">
            <AccountCircleIcon />
            <Typography variant="body1">{user}</Typography>
            <IconButton aria-label="fingerprint" color="secondary" onClick={handleLogout}>
                <Fingerprint />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        className={`drawer ${open ? 'drawer--expanded' : 'drawer--collapsed'}`}
        classes={{
          paper: `drawer__paper ${open ? 'drawer--expanded' : 'drawer--collapsed'}`
        }}
      >
        <div className="drawer__header">
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} className="menu-item">
              <ListItemIcon className="menu-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                className={open ? '' : 'menu-text--hidden'}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-spacer" />
        <Container className="content-container">
          {children}
        </Container>
      </main>

      {/* Footer */}
      <footer className="footer">
        <Typography variant="body2">
          © {new Date().getFullYear()} File DMS. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default PageLayout;