import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = (props) => {
  return (
    <nav className="navbar navbar2">
	  <div className="container-fluid nav-back2">
	    <div className="navbar-header adminnav-header">
	      <span className="glyphicon glyphicon-menu-hamburger"></span> 
	      &nbsp;&nbsp;&nbsp;
	      YSRJ
	    </div>
	    <ul className="nav navbar-nav navbar-right">	
	      {
	      	props.token?
	      	<li className="dropdown">
	      	  <a className="adminnav-link dropdown-toggle" href="#" data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span> Logged In as Admin</a>
	      	  <ul className="dropdown-menu user-dropdown">
			    <li><Link to="/"><span className="glyphicon glyphicon-home"></span> Homepage</Link></li>
			    <li><a href="" onClick={props.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
			  </ul>
	      	</li>
	      	:
	      	null
	      }
	    </ul>
	  </div>
	</nav>
  );
};

export default Header;
