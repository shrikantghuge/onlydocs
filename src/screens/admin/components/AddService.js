import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import validate from 'jquery-validation';
import $ from "jquery";
import swal from 'sweetalert';
import ReactTable from "react-table";
import "react-table/react-table.css";
class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName : '' ,
      duration : '',
      price : '',
      serviceData : [],
      editId : '',
      deleteId : ''
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
        duration: {
          required: true,
        },
        price: {
          required: true,
        },
      }
    });
    $("#editServiceForm").validate({
      rules: {
        editServiceName: {
          required: true,
        },
        editDuration: {
          required: true,
        },
        editPrice: {
          required: true,
        },
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
  } 
  getServiceData(){
    axios
    .get('/api/get_service')
    .then((response)=> {
      if(response.data.status===200){
        // console.log('response.data',response.data)
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
        duration:this.state.duration, 
        price: this.state.price
      }
      axios
      .post('/api/create_service',formValues)
      .then((response)=> {
        if(response.data.status===200){
          this.setState({
            serviceName: '', 
            duration: '', 
            price: '' 
          },()=>{
            this.getServiceData()
          	swal('Service added successfully!!');
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
  handleUpdate(event){
    event.preventDefault()
    var id = $(event.currentTarget).attr('data-id')
    if($('#editServiceForm').valid()){
      var formValues= {
        serviceName:this.state.editServiceName,
        duration:this.state.editDuration, 
        price: this.state.editPrice,
        serviceId: this.state.editId
      }
      axios
      .put('/api/update_service/'+id,formValues)
      .then((response)=> {
        if(response.data.status===200){
          this.getServiceData()
          swal('Service updated successfully!!');
          $('#editModal').modal('hide');
          $('.modal-backdrop').hide();
        }else{
          swal('Something went wrong..Please try again!!');
        }
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
  }
  handleDelete(event){
    event.preventDefault()
    var id = $(event.currentTarget).attr('data-id')
    axios
    .delete('/api/delete_service/'+id)
    .then((response)=> {
      if(response.data.status===200){
        this.getServiceData()
        swal('Service deleted successfully!!');
        $('#deleteModal').modal('hide');
        $('.modal-backdrop').hide();
      }else{
        swal('Something went wrong..Please try again!!');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleEditBtn(event){
    event.preventDefault();
    var editId = $(event.currentTarget).attr('data-ID');
    var newArray = this.state.serviceData.filter(function (el) {
      return el.ID === editId
    });
    this.setState({
      editServiceName : newArray[0].NAME,
      editDuration : newArray[0].DURATION,
      editPrice : newArray[0].PRICE,
      editId : editId
    });
  }
  handleDeleteBtn(event){
    event.preventDefault();
    var delId = $(event.currentTarget).attr('data-ID');
    this.setState({
      deleteId : delId
    });
  }

  render() {
    function filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
      if (row[id] !== null) {
        return (
          row[id] !== undefined ?
            String(row[id].toString().toLowerCase())
            .includes(filter.value.toString().toLowerCase())
          :
            true
        );
      }
    }
    var dataArray = [];
    var headers = [
      {Header:"Sr No.",accessor: 'srno',sortable: false},
      {Header:"Service Name",accessor: 'serviceName',filterable: true},
      {Header: "Duration", accessor: 'duration',filterable: true},
      {Header: "Price", accessor: 'price',filterable: true},
      {Header: "Actions", accessor: 'action',sortable: false},
    ];

    if(this.state.serviceData&&this.state.serviceData.length>0){
      this.state.serviceData.map((data,index)=>{
        dataArray.push({
          "srno"          : index+1,
          "serviceName"   : data.NAME,
          "duration"      : data.DURATION,
          "price"         : data.PRICE,
          "action"        : <div>
            <a className="" href="#" data-toggle="modal" data-target="#editModal" data-id={data.ID} onClick={this.handleEditBtn.bind(this)} >
              <i className="glyphicon glyphicon-edit"></i>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a className="" href="#" data-toggle="modal" data-target="#deleteModal" data-id={data.ID} onClick={this.handleDeleteBtn.bind(this)}>
              <i className="glyphicon glyphicon-trash"></i>
            </a>
          </div>
        })
      }) 
    }
    return(
  	  <React.Fragment>
  	  	<h4 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">Add Service</h4>
  	    <form id="serviceform">
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Service Name:</label>
    		    <input type="text" className="form-control" id="serviceName" name="serviceName" placeholder="Enter Service Name" value={this.state.serviceName} onChange={this.handleChange} />
    		  </div>
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Duration:</label>
    		    <input type="number" className="form-control" id="duration" name="duration" placeholder="Enter Duration" value={this.state.duration} onChange={this.handleChange} />
    		  </div>
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Price:</label>
    		    <input type="number" className="form-control" id="price" name="price" placeholder="Enter Price" value={this.state.price} onChange={this.handleChange} />
    		  </div>
    		  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 pull-right form-group">
    		    <button type="submit" className="login-btn btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
    		  </div>
    		</form>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <ReactTable data={dataArray} columns={headers} defaultPageSize={5} className="-striped" defaultFilterMethod={filterCaseInsensitive} />
          <div className="modal fade" id="editModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content row">
                <div className="modal-header form-group">
                  <h4 className="pull-left modal-title">Edit Service</h4>
                  <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <form id="editServiceForm" className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                      <label>Service Name:</label>
                      <input type="text" className="form-control" id="editServiceName" name="editServiceName" placeholder="Enter Service Name" value={this.state.editServiceName} onChange={this.handleChange} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                      <label>Duration:</label>
                      <input type="number" className="form-control" id="editDuration" name="editDuration" placeholder="Enter Duration" value={this.state.editDuration} onChange={this.handleChange} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group">
                      <label>Price:</label>
                      <input type="number" className="form-control" id="editPrice" name="editPrice" placeholder="Enter Price" value={this.state.editPrice} onChange={this.handleChange} />
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
                      <button type="button" className="modal-btn btn pull-right" data-id={this.state.editId} onClick={this.handleUpdate.bind(this)}>Update</button>
                    </div>
                  </form>                         
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="deleteModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content row">
                <div className="modal-header form-group">
                  <h4 className="pull-left modal-title">Delete Service</h4>
                  <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
                </div>
                <div className="">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p><b>Are you sure you want to delete this Service?</b></p>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                    <button type="button" className="btn modal-btn pull-right" data-id={this.state.deleteId} onClick={this.handleDelete.bind(this)}>Delete</button>
                  </div>                                   
                </div>
              </div>
            </div>
          </div>
        </div>
  	  </React.Fragment>
  	) 
  }
}
export default connect(null, null)(AddService);
