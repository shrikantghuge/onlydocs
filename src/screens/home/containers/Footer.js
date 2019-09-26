import React, { Component } from "react";
import { connect } from "react-redux";
import FooterOne from '../components/FooterOne';
import FooterTwo from '../components/FooterTwo';

class Footer extends Component {
  render() {
    return(
	  <footer>
	    {/*<FooterOne />*/}
		<FooterTwo />
	  </footer>
	) 
  }
}
export default connect(null, null)(Footer);
