import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from '../components/Footer';
import Dashboard from './Dashboard';
import AddService from '../components/AddService';
import AddServiceForm from '../components/AddServiceForm';
import AddServiceDocument from '../components/AddServiceDocument';
import 'bootstrap/dist/css/bootstrap.min.css';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return(
	  <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
	  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 service-back">
	  	  {
		    this.props.path === '/admin/dashboard'?
	    	  <Dashboard />
	    	:this.props.path === '/admin/add_service'?
	    	  <AddService />
	    	:this.props.path === '/admin/add_serviceform'?
	    	  <AddServiceForm />
	    	:this.props.path === '/admin/add_servicedocument'?
	    	  <AddServiceDocument />
	    	:
	    	null
		  }
	    </div>
	    <Footer />
	  </div>
	) 
  }
}
export default connect(null, null)(MainContent);
