import React from 'react';
import './Footer.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

const tabs = [{
  route: "/",
  icon: HomeIcon,
  label: "Home"
},{
  route: "/recommend",
  icon: AddIcon,
  label: "Recommend"
},{
  route: "/user",
  icon: PersonIcon,
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
    {/* <div className="footer"> 
        <nav className="nav nav-pills nav-fill">
            <a className="nav-item nav-link" href="#"><HomeIcon style={styles.footerIcon}/></a>
            <a className="nav-item nav-link" href="#"><AddIcon style={styles.footerIcon}/></a>
            <a className="nav-item nav-link" href="#"><PersonIcon style={styles.footerIcon}/></a>
        </nav>
    </div> */}
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