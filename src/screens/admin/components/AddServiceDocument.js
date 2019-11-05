import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import validate from 'jquery-validation';
import $ from "jquery";
import swal from 'sweetalert';

class AddServiceDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName : '-- Select --',
      serviceData : [],
      documentName : '',
      mandatoryField : '-- Select --',
      serviceId : '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getServiceData()
    $("#serviceform").validate({
      rules: {
        serviceName: {
          required: true,
        },
        documentName: {
          required: true,
        },
        mandatoryField: {
          required: true,
        }
      }
    });
  }

  handleChange(event){
    const target = event.target;
    const value  = target.value;
    const name   = target.name;
    this.setState({
      [name]: value,
    });

    if(name=='serviceName'){
      var id =  $(event.currentTarget).find('option:selected').attr('data-id')
      this.setState({
        serviceId : id
      })
    }    
  } 

  getServiceData(){
    axios
    .get('/api/get_service')
    .then((response)=> {
      if(response.data.status===200){
        this.setState({
          serviceData: response.data.response
        })
      }else{
        this.setState({
          serviceData: []
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  handleSubmit(event){
    event.preventDefault();
    if($('#serviceform').valid()){
      var formValues= {
        serviceName:this.state.serviceName,
        serviceId:this.state.serviceId,
        documentName :this.state.documentName, 
        mandatoryField: this.state.mandatoryField,
      }
      axios
      .post('/api/create_serviceDocument',formValues)
      .then((response)=> {
        if(response.data.status===200){
          this.setState({
            serviceName: '-- Select --', 
            serviceId: '', 
            documentName: '',
            mandatoryField: '-- Select --', 
          },()=>{
          	swal('Service documents added successfully!!');
          })
        }else{
          swal('Something went wrong..Please try again!!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return(
  	  <React.Fragment>
  	  	<h4 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">Add Service Documents</h4>
  	    <form id="serviceform">
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Service Name:</label>
            <select className="form-control" id="serviceName" name="serviceName" value={this.state.serviceName} onChange={this.handleChange}>
              <option disabled selected={true}>-- Select --</option>
              {this.state.serviceData && this.state.serviceData.length > 0?
                this.state.serviceData.map((data,index)=>{
                  return(
                    <option data-id={data.ID} key={index}>
                      {data.NAME+' ('+data.ID+')'}
                    </option>  
                  )
                })
              :
              null}
            </select>
    		  </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
            <label>Document Name:</label>
            <input type="text" className="form-control" id="documentName" name="documentName" placeholder="Enter Document Name" value={this.state.documentName} onChange={this.handleChange} />
          </div>
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Mandatory:</label>
            <select className="form-control" id="mandatoryField" name="mandatoryField" value={this.state.mandatoryField} onChange={this.handleChange}>
              <option disabled selected={true}>-- Select --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
    		  </div>
          {/*<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <label>Sequence Number:</label>
            <input type="number" className="form-control" id="sequenceNo" name="sequenceNo" placeholder="Enter Sequence Number" value={this.state.sequenceNo} onChange={this.handleChange} />
          </div>*/}
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      		  <div className="row col-lg-2 col-md-2 col-sm-12 col-xs-12 pull-right">
      		    <button type="submit" className="login-btn btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
      		  </div>
          </div>
    		</form>
  	  </React.Fragment>
  	) 
  }
}
export default connect(null, null)(AddServiceDocument);
