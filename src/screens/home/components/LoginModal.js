import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const LoginModal= ({}) => {
  return (
    <div id="loginModal" className="modal fade" role="dialog">
      <div className="modal-dialog modal-sm modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Login/Register</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
			    <label>Enter Mobile Number:</label>
			    <input type="text" className="form-control" name="mobile" placeholder="Enter..." />
			  </div>
			  <div className="form-group">
                <button type="button" className="login-btn btn btn-default" data-dismiss="modal">Send OTP</button>
			  </div>  
            </form>
          </div>
          {/*<div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;