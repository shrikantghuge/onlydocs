import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const HeaderOne = (props) => {
  return (
    <nav className="navbar navbar1">
	  <div className="container-fluid nav-back1">
	    <div className="navbar-header">
	      <Link className="navbar-brand logo-name" to="#">YSRJ</Link>
	    </div>
	    <ul className="nav navbar-nav navbar-right">
	      <li className="active"><Link className="nav-link1" to="/">Home</Link></li>
	      <li><Link className="nav-link1" to="#">About</Link></li>
	      <li><Link className="nav-link1" to="#">Contact</Link></li>	
	      {
	      	props.token?
	      	<li className="dropdown">
	      	  <a className="nav-link1 dropdown-toggle" href="#" data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span> Logged In</a>
	      	  <ul className="dropdown-menu user-dropdown">
	      	  	{
	      	  	  (props.mobile==='9096758067'||props.mobile==='7709582219'||props.mobile==='9158505121')?
			    	<li><Link to="/admin/dashboard"><span className="glyphicon glyphicon-user"></span> Admin</Link></li>
	      	  	  :
	      	  	  null
	      	  	}
			    <li><a href="" onClick={props.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
			  </ul>
	      	</li>
	      	:
	      	<li><a className="nav-link1" href="#" data-toggle="modal" data-target="#loginModal"><span className="glyphicon glyphicon-user"></span> Login/Register</a></li>
	      }
	    </ul>
	  </div>
	</nav>
  );
};

export default HeaderOne;
