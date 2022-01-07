import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import './LoggedOutNav.css';

// when a user is not logged in the navbar will display a clickable logo,
// a link to the about page, a link to the rent page, a link
// to the list your stuff page, and a link to sign in
function LoggedOutNav() {
  //links on nav bar - appear in hamburger dropdown menu if small screen

  const pages = [
    //link to about page
    <Link className="navLink" to="/about">
      About LYSTR
    </Link>,

    //link to rental/home page
    <Link to="/home" className="rentTheme">
      Rent
    </Link>,

    //link to listing page
    <Link to="/add-vehicle" className="listTheme">
      List Your Stuff
    </Link>,

    //link to sign in page
    <Link to="/login" className="navLink">
      Sign in
    </Link>,
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Link to="/home">
            <img src="/images/LYSTR-logo.png" id="logo" />
          </Link>

          {/* HAMBURGER MENU BUTTON WHEN SMALL SCREEN */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              color: 'black',
            }}
          >
            {/* HAMBURGER BUTTON AND ICON */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* HAMBURGER MENU DROPDOWN OPTIONS */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LINK OPTIONS LARGE SCREEN */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LoggedOutNav;
