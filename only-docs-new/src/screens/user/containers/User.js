import React, { Component } from "react";
import { connect } from "react-redux";
import UserMarkup from '../components/UserMarkup';

class User extends Component {
	render() {
		return <UserMarkup />;
	}
}
export default connect(null, null)(User);
