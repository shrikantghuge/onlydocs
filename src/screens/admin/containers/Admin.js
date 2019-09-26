import React, { Component } from "react";
import { connect } from "react-redux";
import LoginScreen from '../components/LoginScreen';
import '../css/admin.css';

class Admin extends Component {
  render() {
    return(
	  <React.Fragment>
	    <LoginScreen />
	  </React.Fragment>
	) 
  }
}
export default connect(null, null)(Admin);