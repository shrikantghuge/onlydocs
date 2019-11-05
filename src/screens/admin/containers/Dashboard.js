import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return(
	  <React.Fragment>
	    <h4 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">Dashboard</h4>
	  </React.Fragment>
	) 
  }
}

export default connect(null,null)(Dashboard);
