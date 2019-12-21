import React, { Component } from "react";
import FooterOne from '../components/FooterOne';
import FooterTwo from '../components/FooterTwo';

class Footer extends Component {
  render() {
    return(
	  <footer>
	    <FooterOne />
		<FooterTwo />
	  </footer>
	) 
  }
}
export default Footer;
