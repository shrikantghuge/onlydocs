import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderTwo = ({}) => {
  return (
    <nav className="navbar navbar2">
	  <div className="container-fluid nav-back2">
	    <ul className="nav navbar-nav">
	      <li className="active"><Link className="nav-link2" to="#">Service 1</Link></li>
	      <li><Link className="nav-link2" to="#">Service 2</Link></li>
	      <li><Link className="nav-link2" to="#">Service 3</Link></li>	
	    </ul>
	  </div>
	</nav>
  );
};

export default HeaderTwo;