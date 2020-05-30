import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';

const HeaderTwo = (props) => {
  return (
    <nav className="navbar navbar2">
	  <div className="container-fluid nav-back2">
	    <ul className="nav navbar-nav">
	      {
          props.serviceData.map((data,index)=>{
            return(
              <li className="active" key={index}>
                <a className="nav-link2" href="/#" data-toggle="modal" data-target="#formModal" data-id={data.ID} onClick={props.getServiceId}>{data.NAME+'('+data.ID+')'}</a>
              </li>  
            )
          })
        }	
	    </ul>
	  </div>
	</nav>
  );
};

export default HeaderTwo;