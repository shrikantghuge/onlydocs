import React, { Component } from "react";
import { connect } from "react-redux";
import Header from './Header';
import Footer from './Footer';
import LoginModal from '../components/LoginModal';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import '../css/Home.css';

class Home extends Component {
  render() {
    return(
	  <React.Fragment>
	    <Header />
	    <LoginModal />
	    <Carousel />
	    <Services />
		<Footer />
	  </React.Fragment>
	) 
  }
}
export default connect(null, null)(Home);
