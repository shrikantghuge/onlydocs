import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderOne from '../components/HeaderOne';
import HeaderTwo from '../components/HeaderTwo';
import HeaderThree from '../components/HeaderThree';

class Header extends Component {
  render() {
    return(
	  <header>
	    <div className="hidden-xs">
	      <HeaderOne />
		  <HeaderTwo />
		</div>
		<div className="visible-xs">
		  <HeaderThree />
		</div>
	  </header>
	) 
  }
}
export default connect(null, null)(Header);
