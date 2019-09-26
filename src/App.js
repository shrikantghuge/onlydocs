import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Routes from "./routes";

const App = () => (
	<Router>
		<div>
			{/*<nav>
				<ul>
					<li>
						<Link to="/">Blank</Link>
					</li>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/user">User</Link>
					</li>
				</ul>
			</nav>*/}
			

			{Routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
		</div>
	</Router>
);

export default App;
