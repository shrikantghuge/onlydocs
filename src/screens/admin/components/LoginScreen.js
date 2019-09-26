import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginScreen= ({}) => {
  return (
    <React.Fragment>
      <div className="outer-wrapper">
      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      	<h3 className="text-center">
      	  Log In
      	</h3>
      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inner-margin">
      	  <form>
            <div className="form-group">
		      <label>Email:</label>
		      <input type="text" className="form-control" name="email" placeholder="Enter Email Address" />
		    </div>
		    <div className="form-group">
		      <label>Password:</label>
		      <input type="password" className="form-control" name="password" placeholder="Enter Password" />
		    </div>
		    <div className="form-group inner-margin">
              <button type="button" className="login-btn btn btn-default">Log In</button>
		    </div>  
          </form>
      	</div>
      	</div>
      </div>	
    </React.Fragment>
  );
};

export default LoginScreen;