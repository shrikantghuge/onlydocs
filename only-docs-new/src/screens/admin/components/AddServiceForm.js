import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import validate from 'jquery-validation';
import $ from "jquery";
import swal from 'sweetalert';
// import ReactTable from "react-table";
// import "react-table/react-table.css";
class AddServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName : '-- Select --',
      serviceData : [],
      fieldName : '-- Select --',
      sequenceNo : '',
      type : '',
      option : '',
      mandatoryField : '-- Select --',
      serviceId : '',
      labelName : '',
      serviceFormData : [],
      editId : '',
      deleteId : ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getServiceData()
    this.getServiceForm() 
    $("#serviceform").validate({
      rules: {
        serviceName: {
          required: true,
        },
        fieldName: {
          required: true,
        },
        type: {
          required: true,
        },
        option: {
          required: true,
        },
        sequenceNo: {
          required: true,
        },
        mandatoryField: {
          required: true,
        },
        labelName: {
          required: true,
        },
      }
    });
    $("#editServiceForm").validate({
      rules: {
        editServiceName: {
          required: true,
        },
        editFieldName: {
          required: true,
        },
        editType: {
          required: true,
        },
        editOption: {
          required: true,
        },
        editSequenceNo: {
          required: true,
        },
        editMandatoryField: {
          required: true,
        },
        editLabelName: {
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

    if(name==='serviceName'){
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
      // console.log('response',response)
      if(response.status===200){
        this.setState({
          serviceData: response.data.response
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });  
  }
  getServiceForm(){
    axios
    .get('/api/get_serviceForm')
    .then((response)=> {
      if(response.data.status===200){
        // console.log('response.data',response.data)
        this.setState({
          serviceFormData: response.data.response
        })
      }else{
        this.setState({
          serviceFormData: []
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
        fieldName :this.state.fieldName, 
        type: this.state.type,
        option: this.state.option,
        sequenceNo: this.state.sequenceNo,
        mandatoryField: this.state.mandatoryField,
        labelName: this.state.labelName,
      }
      axios
      .post('/api/create_serviceForm',formValues)
      .then((response)=> {
        if(response.status===200){
          this.setState({
            serviceName: '-- Select --', 
            serviceId: '', 
            fieldName: '-- Select --',
            type: '', 
            option: '', 
            sequenceNo: '', 
            labelName: '', 
            mandatoryField: '-- Select --', 
          },()=>{
          	this.getServiceForm()
            swal('Service form fields added successfully!!');
          })
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
        fieldName:this.state.editFieldName,
        label:this.state.editLabelName,
        type:this.state.editType, 
        option:this.state.editOption, 
        sequenceno: this.state.editSequenceNo,
        mandatory: this.state.editMandatoryField,
        serviceId: this.state.serviceId,
        fieldId: this.state.editId
      }
      // console.log('formValues',formValues)
      axios
      .put('/api/update_serviceForm/'+id,formValues)
      .then((response)=> {
        if(response.data.status===200){
          this.getServiceData()
          this.getServiceForm()
          swal('Service updated successfully!!');
          $('#editModal').modal('hide');
          $('.modal-backdrop').hide();
        }else{
          // console.log('response.',response)
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
    .delete('/api/delete_serviceForm/'+id)
    .then((response)=> {
      console.log('response',response)
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
    var serviceId = $(event.currentTarget).attr('data-serviceid');
    var newArray = this.state.serviceFormData.filter(function (el) {
      return el.data.ID === editId
    });
    this.setState({
      editServiceName : newArray[0].serviceName,
      serviceId : serviceId,
      editFieldName : newArray[0].data.NAME,
      editLabelName : newArray[0].data.LABEL,
      editType : newArray[0].data.TYPE,
      editOption : newArray[0].data.OPTION,
      editMandatoryField : newArray[0].mandatory,
      editSequenceNo : newArray[0].data.SEQUENCENO,
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
    // function filterCaseInsensitive(filter, row) {
    //   const id = filter.pivotId || filter.id;
    //   if (row[id] !== null) {
    //     return (
    //       row[id] !== undefined ?
    //         String(row[id].toString().toLowerCase())
    //         .includes(filter.value.toString().toLowerCase())
    //       :
    //         true
    //     );
    //   }
    // }
    // var dataArray = [];
    // var headers = [
    //   {Header:"Sr No.",accessor: 'srno',sortable: false},
    //   {Header:"Service Name",accessor: 'serviceName',filterable: true},
    //   {Header:"Label Name", accessor: 'labelName',filterable: true},
    //   {Header:"Field Name", accessor: 'fieldName',filterable: true},
    //   {Header:"Type", accessor: 'type',filterable: true},
    //   {Header:"Option", accessor: 'option',sortable: false},
    //   {Header:"Mandatory", accessor: 'mandatory',filterable: true},
    //   {Header:"Sequence No", accessor: 'sequence',filterable: true},
    //   {Header:"Actions", accessor: 'action',sortable: false},
    // ];

    // if(this.state.serviceFormData&&this.state.serviceFormData.length>0){
    //   this.state.serviceFormData.map((data,index)=>{
    //     dataArray.push({
    //       "srno"          : index+1,
    //       "serviceName"   : data.serviceName+' ('+data.serviceId+')',
    //       "fieldName"     : data.data.NAME,
    //       "labelName"     : data.data.LABEL,
    //       "mandatory"     : data.mandatory,
    //       "sequence"      : data.data.SEQUENCENO,
    //       "type"          : data.data.TYPE?data.data.TYPE:'-',
    //       "option"        : data.data.OPTION?data.data.OPTION:'-',
    //       "action"        : <div>
    //         <a className="" href="/#" data-toggle="modal" data-target="#editModal" data-id={data.data.ID} data-serviceid={data.serviceId} onClick={this.handleEditBtn.bind(this)} >
    //           <i className="glyphicon glyphicon-edit"></i>
    //         </a>
    //         &nbsp;&nbsp;&nbsp;&nbsp;
    //         <a className="" href="/#" data-toggle="modal" data-target="#deleteModal" data-id={data.data.ID} onClick={this.handleDeleteBtn.bind(this)}>
    //           <i className="glyphicon glyphicon-trash"></i>
    //         </a>
    //       </div>
    //     })
    //   }) 
    // }
    return(
  	  <React.Fragment>
  	  	<h4 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">Add Service Form Fields</h4>
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
    		    <label>Field Name:</label>
            <select className="form-control" id="fieldName" name="fieldName" value={this.state.fieldName} onChange={this.handleChange}>
              <option disabled selected={true}>-- Select --</option>
              <option>input</option>
              <option>select</option>
              <option>textarea</option>
            </select>
    		  </div>
          {
            this.state.fieldName === 'input'?
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
              <label>Type:</label>
              <input type="text" className="form-control" id="type" name="type" placeholder="Enter Input Type" value={this.state.type} onChange={this.handleChange} />
            </div>
            :this.state.fieldName === 'select'?
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
              <label>Option:</label>
              <input type="text" className="form-control" id="option" name="option" placeholder="Enter Select Option" value={this.state.option} onChange={this.handleChange} />
            </div>
            :
            null
          }
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
            <label>Label Name:</label>
            <input type="text" className="form-control" id="labelName" name="labelName" placeholder="Enter Label Name" value={this.state.labelName} onChange={this.handleChange} />
          </div>
    		  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
    		    <label>Mandatory:</label>
            <select className="form-control" id="mandatoryField" name="mandatoryField" value={this.state.mandatoryField} onChange={this.handleChange}>
              <option disabled selected={true}>-- Select --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
    		  </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <label>Sequence Number:</label>
            <input type="number" className="form-control" id="sequenceNo" name="sequenceNo" placeholder="Enter Sequence Number" value={this.state.sequenceNo} onChange={this.handleChange} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      		  <div className="row col-lg-2 col-md-2 col-sm-12 col-xs-12 pull-right form-group">
      		    <button type="submit" className="login-btn btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
      		  </div>
          </div>
    		</form>
        {/*
          *********if api for update and delete is working uncomment this********
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <ReactTable data={dataArray} columns={headers} defaultPageSize={5} className="-striped" defaultFilterMethod={filterCaseInsensitive} />
            <div className="modal fade" id="editModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content row">
                  <div className="modal-header form-group">
                    <h4 className="pull-left modal-title">Edit Service Form</h4>
                    <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form id="editServiceForm" className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                        <label>Service Name:</label>
                        <select className="form-control" id="editServiceName" name="editServiceName" value={this.state.editServiceName+' ('+this.state.serviceId+')'} onChange={this.handleChange}>
                          <option disabled selected={true}>-- Select --</option>
                          {this.state.serviceData && this.state.serviceData.length > 0?
                            this.state.serviceData.map((data,index)=>{
                              return(
                                <option value={data.NAME+' ('+data.ID+')'} key={index+data.ID}>
                                  {data.NAME+' ('+data.ID+')'}
                                </option>  
                              )
                            })
                          :
                          null}
                        </select>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                        <label>Field Name:</label>
                        <select className="form-control" id="editFieldName" name="editFieldName" value={this.state.editFieldName} onChange={this.handleChange}>
                          <option disabled selected={true}>-- Select --</option>
                          <option>input</option>
                          <option>select</option>
                          <option>textarea</option>
                        </select>
                      </div>
                      {
                        this.state.editFieldName === 'input'?
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                          <label>Type:</label>
                          <input type="text" className="form-control" id="editType" name="editType" placeholder="Enter Input Type" value={this.state.editType} onChange={this.handleChange} />
                        </div>
                        :this.state.editFieldName === 'select'?
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                          <label>Option:</label>
                          <input type="text" className="form-control" id="editOption" name="editOption" placeholder="Enter Select Option" value={this.state.editOption} onChange={this.handleChange} />
                        </div>
                        :
                        null
                      }
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                        <label>Label Name:</label>
                        <input type="text" className="form-control" id="editLabelName" name="editLabelName" placeholder="Enter Label Name" value={this.state.editLabelName} onChange={this.handleChange} />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                        <label>Mandatory:</label>
                        <select className="form-control" id="editMandatoryField" name="editMandatoryField" value={this.state.editMandatoryField} onChange={this.handleChange}>
                          <option disabled selected={true}>-- Select --</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <label>Sequence Number:</label>
                        <input type="number" className="form-control" id="editSequenceNo" name="editSequenceNo" placeholder="Enter Sequence Number" value={this.state.editSequenceNo} onChange={this.handleChange} />
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
                    <h4 className="pull-left modal-title">Delete Service Form</h4>
                    <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p><b>Are you sure you want to delete this Service Form?</b></p>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                      <button type="button" className="btn modal-btn pull-right" data-id={this.state.deleteId} onClick={this.handleDelete.bind(this)}>Delete</button>
                    </div>                                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        */}
  	  </React.Fragment>
  	) 
  }
}
export default connect(null, null)(AddServiceForm);
