import React from 'react';
import '../index.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

const Footer = () =>  (
    <div className="footer"> 
        <nav className="nav nav-pills nav-fill">
            <a className="nav-item nav-link" href="#"><HomeIcon style={{fill: "#1c3580"}}/></a>
            <a className="nav-item nav-link" href="#"><AddIcon style={{fill: "#1c3580"}}/></a>
            <a className="nav-item nav-link" href="#"><PersonIcon style={{fill: "#1c3580"}}/></a>
        </nav>
    </div>
);

export default Footer;