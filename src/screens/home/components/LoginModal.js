import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import validate from 'jquery-validation';
import $ from "jquery";
import swal from 'sweetalert';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile : '' ,
      firstName : '',
      lastName : '',
      otp : '',
      recentOtp : '',
      showLogin : true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    $("#loginform").validate({
      rules: {
        mobile: {
          required: true,
        },
        // firstName: {
        //   required: true,
        // },
        // lastName: {
        //   required: true,
        // },
        otp: {
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

  sendOtp(event){
    event.preventDefault();
    if($('#loginform').valid()){
      var formValues= {
        mobile:this.state.mobile,
        status:'Blocked', 
        otp: Math.floor(1000 + Math.random() * 9000)
      }
      axios
      .post('/api/create_user',formValues)
      .then((response)=> {
        if(response.data.status===200){
          this.setState({
            recentOtp: formValues.otp, 
            'showLogin' : false
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

  registerUser(event){
    event.preventDefault();
    if($('#loginform').valid()){
      if(this.state.recentOtp===parseInt(this.state.otp)){
        var formValues= {
          mobile:this.state.mobile,
          status:'Active',
          otp: '',
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
        axios
        .put('/api/update_usersession',formValues)
        .then((response)=> {
          if(response.data.status===200){
            this.setState({
              'recentOtp' : ''
            },()=>{
              localStorage.setItem('token',formValues.id);
              localStorage.setItem('mobile',formValues.mobile);              
              this.props.setToken(formValues.id)
              this.props.setMobile(formValues.mobile)
              $('#loginModal').modal('hide');
              $('.modal-backdrop').hide();
            })
          }else{
            swal('Something went wrong..Please try again!!');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        swal('Entered OTP does not match with sent OTP')
      }
    }
  }

  render() {
    return (
      <div id="loginModal" className="modal fade" role="dialog">
        {
          this.state.showLogin?
          <div className="modal-dialog modal-sm modal-xs">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Login/Register</h4>
              </div>
              <div className="modal-body">
                <form id="loginform">
                  <div className="form-group">
                    <label>Enter Mobile Number:</label>
                    <input type="text" className="form-control" name="mobile" placeholder="Enter..." onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <button type="button" className="login-btn btn btn-default" onClick={this.sendOtp.bind(this)}>Send OTP</button>
                  </div>  
                </form>
              </div>
              {/*<div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>*/}
            </div>
          </div>
          :
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Login/Register</h4>
              </div>
              <div className="modal-body">
                <form id="loginform">
                  <div className="form-group">
                    <label>Enter Mobile Number:</label>
                    <input type="text" className="form-control" name="mobile" value={this.state.mobile} disabled='disabled' onChange={this.handleChange} />
                  </div>
                  {/*<div className="form-group">
                    <label>Enter FirstName:</label>
                    <input type="text" className="form-control" name="firstName" placeholder="Enter FirstName..." onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Enter LastName:</label>
                    <input type="text" className="form-control" name="lastName" placeholder="Enter LastName..." onChange={this.handleChange} />
                  </div>*/}
                  <div className="form-group">
                    <label>Enter OTP:</label>
                    <input type="text" className="form-control" name="otp" placeholder="Enter OTP..." onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <button type="button" className="login-btn btn btn-default" onClick={this.registerUser.bind(this)}>Login</button>
                  </div>  
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    setToken : (value)=>dispatch({
      type : "UPDATE_TOKEN",
      payload : value, 
    }),
    setMobile : (value)=>dispatch({
      type : "UPDATE_MOBILE",
      payload : value, 
    }),
  }
}
export default connect(null, mapDispatchToProps)(LoginModal);