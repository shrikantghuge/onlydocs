import React, { Component } from "react";
import { connect } from "react-redux";
// import LoginScreen from '../components/LoginScreen';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from './MainContent';
import $ from "jquery";
import '../css/admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    this.props.setToken('')
    this.props.setMobile('')
  }
  render() {
    return(
  	  <React.Fragment>
  	    {/*<LoginScreen />*/}
  	    <Header token={this.props.token} logout={this.logout} />
  	    <Sidebar path={window.location.pathname} />
  	    <MainContent path={window.location.pathname} />
  	  </React.Fragment>
  	) 
  }
}
const mapStateToProps = (state) => {
  return {
    token : state.homeReducer.loginToken,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    setToken : (value)=>dispatch({
      type : "UPDATE_TOKEN",
      payload : value, 
    }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);