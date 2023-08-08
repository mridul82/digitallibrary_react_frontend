import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUserDate();
}, []);


const fetchUserDate = async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
           // console.log(userData);
            const username = userData ? userData.name : "";
            setUsername(username);
}


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
}

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {/* Use Link to navigate to the Dashboard */}
            <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              Dashboard
            </Link>
            
            <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
              Add Content
            </Link>
        
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' } }}>
              Welcome, {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
