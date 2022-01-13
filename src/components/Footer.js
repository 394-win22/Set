import React from 'react';
import './Footer.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {Checkroom, Assistant, AddCircle, AccountCircle} from '@mui/icons-material';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


const tabs = [{
  route: "/",
  icon: Checkroom,
  label: "Closet"
},{
  route: "/additem",
  icon: AddCircle,
  label: "Add"
},{
  route: "/recommend",
  icon: Assistant,
  label: "Recommend"
},{
  route: "/user",
  icon: AccountCircle,
  label: "User"
}]

const styles = {
    footerIcon: {
      width: 60,
      height: 60,
    }
  };

const OldFooter = () => (
  <>
    <div className="footer-margin"></div>
    <nav className="fixed-bottom navbar-light bottom-tab-nav footer" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                <NavItem key={`tab-${index}`}>
                  <NavLink to={tab.route} className="nav-link bottom-nav-link" style={({ isActive }) => {
                      return {
                        display: "block",
                        color: isActive ? "#1c3580" : ""
                      };
                    }}>
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <Icon style={styles.footerIcon} />
                      <div className="bottom-tab-label">{tab.label}</div>
                    </div>
                  </NavLink>
                </NavItem>
              );})
            }
          </div>
        </Nav>
    </nav>
  </> 
);

function Footer() {
  const [value, setValue] = React.useState(0);

  const { pathname } = useLocation();
  if (pathname === "/login") return null;

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={4}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <BottomNavigationAction key={`tab-${index}`} component={Link} to={tab.route} label={tab.label} icon={<Icon />} />
            );}
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

function SpeedDialFooter() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { pathname } = useLocation();
  if (pathname === "/login") return null;

  return (
    <Box sx={{flexGrow: 1}}>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <SpeedDialAction key={`tab-${index}`} component={Link} to={tab.route} tooltipTitle={tab.label} icon={<Icon />} />
            );}
          )}
        </SpeedDial>
      </Box>
  );
}

export default Footer;