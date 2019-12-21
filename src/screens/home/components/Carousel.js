import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';

const Carousel= () => {
  return (
    <React.Fragment>
      <div id="Carousel" className="carousel slide" data-ride="carousel">
	  <ol className="carousel-indicators">
	    <li data-target="#Carousel" data-slide-to="0" className="active"></li>
	    <li data-target="#Carousel" data-slide-to="1"></li>
	    <li data-target="#Carousel" data-slide-to="2"></li>
	    <li data-target="#Carousel" data-slide-to="3"></li>
	  </ol>

	  <div className="carousel-inner">
	    <div className="item active img-htwt">
	      <img src="/images/carousel-img1.png" alt="Digital India"/>
	    </div>
	    <div className="item img-htwt">
	      <img src="/images/carousel-img2.png" alt="Digital India"/>
	    </div>
	    <div className="item img-htwt">
	      <img src="/images/carousel-img3.jpg" alt="Digital India"/>
	    </div>
	    <div className="item img-htwt">
	      <img src="/images/carousel-img4.png" alt="Digital India"/>
	    </div>
	  </div>

	  <a className="left carousel-control" href="#Carousel" data-slide="prev">
	    <span className="glyphicon glyphicon-chevron-left"></span>
	    <span className="sr-only">Previous</span>
	  </a>
	  <a className="right carousel-control" href="#Carousel" data-slide="next">
	    <span className="glyphicon glyphicon-chevron-right"></span>
	    <span className="sr-only">Next</span>
	  </a>
	</div>
    </React.Fragment>
  );
};

export default Carousel;