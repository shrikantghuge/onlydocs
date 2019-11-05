import React from "react";
import "./App.css";
import Layout from './screens/layout/Layout.js';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3024/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => (
  <div>
	<Layout />			
  </div>
);

export default App;
