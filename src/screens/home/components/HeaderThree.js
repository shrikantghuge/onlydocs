import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const HeaderThree = ({}) => {
  return (
    <nav className="navbar navbar2">
	  <div className="container-fluid nav-back2">
	    <div className="navbar-header">
	      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarMenu">
	        <span className="icon-bar"></span>
	        <span className="icon-bar"></span>
	        <span className="icon-bar"></span> 
	      </button>
	      <Link className="navbar-brand" to="#">WebSiteName</Link>
	    </div>
	    <div class="collapse navbar-collapse" id="navbarMenu">
	      <ul className="nav navbar-nav">
	        <li className="active"><Link className="nav-link2" to="#">Service 1</Link></li>
	        <li><Link className="nav-link2" to="#">Service 2</Link></li>
	        <li><Link className="nav-link2" to="#">Service 3</Link></li>	
		  </ul>
		  <hr />
	      <ul className="nav navbar-nav navbar-right">
	        <li className="active"><Link className="nav-link1" to="/">Home</Link></li>
	        <li><Link className="nav-link1" to="#">About</Link></li>
	        <li><Link className="nav-link1" to="#">Contact</Link></li>	
	        <li><a className="nav-link1" href="#" data-toggle="modal" data-target="#loginModal"><span className="glyphicon glyphicon-user"></span> Login/Register</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>
  );
};

export default HeaderThree;
