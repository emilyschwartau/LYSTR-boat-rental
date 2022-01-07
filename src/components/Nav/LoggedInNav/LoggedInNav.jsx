import React from 'react';
import { Link } from 'react-router-dom';
import './LoggedInNav.css';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

//If a user is logged in navbar will display clickable logo,
// link to rent, link to list, clickable profile photo, and
// dropdown menu from profile photo that displays links to 
// user dashboard, about page, and sign out
function LoggedInNav() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //dropdown menu from profile photo
  const settings = [
    //link to user dashboard
    <Link className="userDropdown" to="/user">
      User Dashboard
    </Link>,

    //link to about page
    <Link className="userDropdown" to="/about">
      About LYSTR
    </Link>,

    //link to sign out
    <p id="signOut" onClick={() => dispatch({ type: 'LOGOUT' })}>
      Sign Out
    </p>,

  ];

  //links on nav bar - appear in hamburger dropdown menu if small screen
  const pages = [
    //link to home page/ rental page
    <Link to="/home" className="rentTheme">
      Rent
    </Link>,

    //link to list vehicle page
    <Link to="/add-vehicle" className="listTheme">
      List Your Stuff
    </Link>,

  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let profilePicPath;
  if (user.profile_picture) {
    profilePicPath = `/api/user/pic/${user.profile_picture}`;
  }

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

          {/* PROFILE PHOTO AND DROPDOWN */}
          <Box sx={{ flexGrow: 0 }}>
            {/* PHOTO AND OPEN DROPDOWN ON CLICK */}
            <Tooltip title="View Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                <Avatar id="profilePicture" src={profilePicPath} />
              </IconButton>
            </Tooltip>

            {/* MENU ITEMS */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LoggedInNav;
