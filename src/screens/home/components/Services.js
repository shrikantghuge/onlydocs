import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services= ({}) => {
  return (
    <React.Fragment>
      <h1 className="service-head text-center">
        Our Services
      </h1>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 service-div">
	    {[1,2,3,4,5,6,7,8].map((service,index)=>{
          return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" key={index}>
              <Link to="#" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 serviceBlock-div text-center">
            	<div className="glyphicon glyphicon-envelope"></div>
            	<h3 className="serviceBlock-head">
            	  Service {service}	
            	</h3>
            	<p>
            	  Well studied and verified drafts from legal experts
            	</p>
              </Link>
            </div>
          )
        })}	
	  </div>
    </React.Fragment>
  );
};

export default Services;