import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const HeaderOne = ({}) => {
  return (
    <nav className="navbar navbar1">
	  <div className="container-fluid nav-back1">
	    <div className="navbar-header">
	      <Link className="navbar-brand logo-name" to="#">WebSiteName</Link>
	    </div>
	    <ul className="nav navbar-nav navbar-right">
	      <li className="active"><Link className="nav-link1" to="/">Home</Link></li>
	      <li><Link className="nav-link1" to="#">About</Link></li>
	      <li><Link className="nav-link1" to="#">Contact</Link></li>	
	      <li><a className="nav-link1" href="#" data-toggle="modal" data-target="#loginModal"><span className="glyphicon glyphicon-user"></span> Login/Register</a></li>
	    </ul>
	  </div>
	</nav>
  );
};

export default HeaderOne;
