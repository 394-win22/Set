import React from 'react';
import './Footer.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AssistantIcon from '@mui/icons-material/Assistant';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const tabs = [{
  route: "/",
  icon: CheckroomIcon,
  label: "Closet"
},{
  route: "/recommend",
  icon: AssistantIcon,
  label: "Recommend"
},{
  route: "/additem",
  icon: AddCircleIcon,
  label: "Add"
},{
  route: "/user",
  icon: AccountCircleIcon,
  label: "User"
}]

const styles = {
    footerIcon: {
      width: 60,
      height: 60,
    }
  };

const Footer = () => (
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

export default Footer;