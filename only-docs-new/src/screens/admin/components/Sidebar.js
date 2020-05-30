import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 admin-sidebar">
      <ul className="admin-dropdown">
       <li className={props.path==='/admin/dashboard'?'active':''}>
         <Link to="/admin/dashboard"><span className="glyphicon glyphicon-dashboard"></span> Dashboard</Link>
       </li>
       <li className={props.path==='/admin/add_service'?'active':''}>
         <Link to="/admin/add_service"><span className="glyphicon glyphicon-plus-sign"></span> Add Service</Link>
       </li>
       <li className={props.path==='/admin/add_serviceform'?'active':''}>
         <Link to="/admin/add_serviceform"><span className="glyphicon glyphicon-plus-sign"></span> Add Service Form</Link>
       </li>
       <li className={props.path==='/admin/add_servicedocument'?'active':''}>
         <Link to="/admin/add_servicedocument"><span className="glyphicon glyphicon-plus-sign"></span> Add Service Document</Link>
       </li>
      </ul>
    </div>
  );
};

export default Sidebar;