import React, { Component } from "react";
import { connect } from "react-redux";
import AboutMarkup from '../components/AboutMarkup';

class About extends Component {
	render() {
		return <AboutMarkup />;
	}
}
export default connect(null, null)(About);
