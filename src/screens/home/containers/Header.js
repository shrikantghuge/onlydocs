import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderOne from '../components/HeaderOne';
import HeaderTwo from '../components/HeaderTwo';
import HeaderThree from '../components/HeaderThree';
import axios from 'axios';
import $ from "jquery";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData : []
    }
    this.getServiceId = this.getServiceId.bind(this)
  }
  componentDidMount(){
    this.getServiceData()
  }
  logout(){
    localStorage.removeItem("token");
	  localStorage.removeItem("mobile");
    this.props.setToken('')
    this.props.setMobile('')
  }
  getServiceData(){
    axios
    .get('/api/get_service')
    .then((response)=> {
      if(response.data.status===200){
        this.setState({
          'serviceData' : response.data.response
        })
      }else{
        // this.setState({
        //   'serviceData' : []
        // })
      }
    })
    .catch(function (error) {
      console.log(error);
    });  
  }
  getServiceId(event){
    var serviceId = $(event.currentTarget).attr('data-id')
    this.props.setServiceId(serviceId)
  }

  render() {
    return(
  	  <header>
  	    <div>
  	      <HeaderOne token={this.props.token} mobile={this.props.mobile} logout={this.logout} />
          {
            this.state.serviceData&&this.state.serviceData.length>0?
    		      <HeaderTwo serviceData={this.state.serviceData} getServiceId={this.getServiceId} />
            :
            null
          }
    		</div>
    		{/*<div className="visible-xs">
    		  <HeaderThree />
    		</div>*/}
  	  </header>
  	) 
  }
}

const mapStateToProps = (state) => {
  return {
    token : state.homeReducer.loginToken,
    mobile : state.homeReducer.loginMobile,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    setToken : (value)=>dispatch({
      type : "UPDATE_TOKEN",
      payload : value, 
    }),
    setServiceId : (value)=>dispatch({
      type : "UPDATE_SERVICEID",
      payload : value, 
    }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
