import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

function Nav() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const settings = ['User Dashboard', <p id="signOut" onClick={() => dispatch({ type: 'LOGOUT' })}>Sign Out</p>];

  let pages = [];
  if (user.id === undefined || user.id === null) {
    pages = [<Link to="/about">About</Link>, <Link to="/login">Login / Register</Link>];
  }
  else if (user.id) {
    pages = [<Link to="/about">About</Link>, <Link to='/home'>Home</Link>, <Link to="/info">Info Page</Link>, <Link to="/add">Add Vehicle</Link> ];
  }
  

  // return (
  //   <div className="nav">
      // <Link to="/home">
      //   <h2 className="nav-title">Prime Solo Project</h2>
      // </Link>
  //     <div>
  //       {/* If no user is logged in, show these links */}

  //       {(user.id === undefined || user.id === null) &&

  //         // If there's no user, show login/registration links
          // <Link className="navLink" to="/login">
          //   Login / Register
          // </Link>
  //       }

  //       {/* If a user is logged in, show these links */}
  //       {user.id && (
  //         <>
  //           <Link className="navLink" to="/user">
  //             Home
  //           </Link>

            // <Link className="navLink" to="/info">
            //   Info Page
            // </Link>

            // <Link className="navLink" to="/add">
            //   Add Vehicle
            // </Link>

  //           <LogOutButton className="navLink" />

  //         <Link className="navLink"><img src={user.profile_picture}  id="profilePicture"/></Link>
            
            
  //         </>
  //       )}

  //       <Link className="navLink" to="/about">
  //         About
  //       </Link>
  //     </div>
  //   </div>
  // );

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* LOGO */}
          
          <Link to="/home">
          <img src="/images/LYSTR-logo.png" id="logo"/>
          </Link>
          

          

          {/* HAMBURGER MENU BUTTON WHEN SMALL SCREEN */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* EXTRA STUFF THAT SAID LOGO ON SMALL SCREEN - NOT NEEDED? */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {/* LOGO */}
          </Typography>

          {/* LINK OPTIONS LARGE SCREEN */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* PROFILE PHOTO AND LOGOUT DROPDOWN ON CLICK */}
          <Box sx={{ flexGrow: 0 }}>

            {/* PHOTO AND OPEN DROPDOWN ON CLICK */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            {/* MENU ITEMS */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
