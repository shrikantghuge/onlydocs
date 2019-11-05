import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import validate from 'jquery-validation';
import $ from "jquery";
import swal from 'sweetalert';

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceDataById : {
        formData : [],
        docData : [],
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    $("#form").validate({
      rules: {
        // mobile: {
        //   required: true,
        // }
      }
    });
  }
  componentDidUpdate(prevProps){
    if((prevProps.serviceId!=this.props.serviceId)&&this.props.serviceId){
      this.getServiceDataById(this.props.serviceId)
    }
  }
  handleChange(event){
    const target = event.target;
    const value  = target.value;
    const name   = target.name;
    this.setState({
      [name]: value,
    });    
  } 
  getServiceDataById(serviceId){
    main().then(serviceDataById => {
      this.setState({
        serviceDataById:serviceDataById
      })
    })
    async function main(){
      var formData = await getFormData(serviceId)
      var docData = await getDocData(serviceId)
      var serviceDataById = {formData,docData}
      // console.log("serviceDataById = ",serviceDataById);
      return Promise.resolve(serviceDataById);
    }
    function getFormData(id){
      return new Promise(function(resolve,reject){
        axios
        .get('/api/get_serviceForm/'+id)
        .then((response)=> {
          if(response.data.status===200){
            resolve(response.data.response)          
          }else{
            resolve([])          
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      })
    }
    function getDocData(id){
      return new Promise(function(resolve,reject){
        axios
        .get('/api/get_serviceDocument/'+id)
        .then((response)=> {
          if(response.data.status===200){
            resolve(response.data.response)
          }else{
            resolve([])          
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      })
    } 
  }
  handleSubmit(event){
    event.preventDefault();
    if($('#form').valid()){
      // var formValues= {
      //   mobile:this.state.mobile,
      //   status:'Blocked', 
      //   otp: Math.floor(1000 + Math.random() * 9000)
      // }
      // axios
      // .post('/api/create_user',formValues)
      // .then((response)=> {
      //   if(response.status===200){
      //     this.setState({
      //       recentOtp: formValues.otp, 
      //       'showLogin' : false
      //     })
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
  }

  render() {
    return (
      <div id="formModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{}</h4>
            </div>
            <div className="modal-body form-modalBody" id="modalBody">
              {
                (this.state.serviceDataById&&this.state.serviceDataById.formData.length>0
                  &&this.state.serviceDataById.docData.length>0)?
                  <div className="row">
                    <React.Fragment>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Required Documents :</label>
                        {this.state.serviceDataById.docData.map((data,index)=>{
                          return(
                            <p key={data.ID+index}>
                              {data.NAME}
                            </p>
                          )
                        })}
                      </div>
                      <form id="form"> 
                        {
                          this.state.serviceDataById.formData.map((data,index)=>{
                            return(
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group" key={data.ID}>
                                <label>{data.LABEL}:</label>
                                {
                                  data.NAME === 'input'?
                                  <input type={'"'+data.TYPE+'"'} className="form-control" name={'"'+data.SEQUENCENO+'"'} placeholder={'Enter '+data.LABEL} value={this.state[data.SEQUENCENO]} onChange={this.handleChange}/>
                                  : 
                                  data.NAME === 'select'?
                                  <select className="form-control" name={'"'+data.SEQUENCENO+'"'} value={this.state[data.SEQUENCENO]} onChange={this.handleChange}>
                                    <option disabled selected={true}>-- Select --</option>
                                    {data.option?
                                      data.option.split(',').map((option,ind)=>{
                                        return(
                                          <option key={ind}>
                                            {option}
                                          </option>  
                                        )
                                      })
                                    :
                                    null}
                                  </select>
                                  :
                                  <textarea class="form-control" rows="2" name={'"'+data.SEQUENCENO+'"'} value={this.state[data.SEQUENCENO]} placeholder={'Enter '+data.LABEL} onChange={this.handleChange}></textarea>
                                }
                              </div>
                            )
                          })
                        }  
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="row col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right form-group">
                            <button type="button" className="login-btn btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
                          </div>
                        </div>  
                      </form>
                    </React.Fragment>
                  </div>
                :
                <h5 className="col-lg-12 col-md-12 col-sm-12 col-xs-12">No Form Data Available</h5> 
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serviceId : state.homeReducer.serviceId,
  }
}
export default connect(mapStateToProps, null)(FormModal);