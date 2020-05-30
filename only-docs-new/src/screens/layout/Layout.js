import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../home/containers/Home.js';
import Admin from '../admin/containers/Admin.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
  }

  render() {
    return(
      <React.Fragment>
      	<Router>
      	  <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin/:path" component={Admin} exact />
            {/*<Route path="/admin/add_service" component={Admin} exact />
            <Route path="/admin/add_serviceform" component={Admin} exact />
            <Route path="/admin/add_servicedocument" component={Admin} exact />*/}
      	  </Switch>
      	</Router>
      </React.Fragment>
  	) 
  }
}
const mapStateToProps = (state) => {
  return {
    mobile : state.homeReducer.loginMobile,
  }
}
export default connect(mapStateToProps, null)(Layout);
