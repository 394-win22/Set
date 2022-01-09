import React from 'react';
import '../index.css';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

const styles = {
    footerIcon: {
      fill: "#1c3580",
      margin: 10,
      width: 40,
      height: 40,
    },
  };

const Footer = () =>  (
  <>
    <div class="footer-margin"></div>
    <div className="footer"> 
        <nav className="nav nav-pills nav-fill">
            <a className="nav-item nav-link" href="#"><HomeIcon style={styles.footerIcon}/></a>
            <a className="nav-item nav-link" href="#"><AddIcon style={styles.footerIcon}/></a>
            <a className="nav-item nav-link" href="#"><PersonIcon style={styles.footerIcon}/></a>
        </nav>
    </div>
  </>
    
);

export default Footer;