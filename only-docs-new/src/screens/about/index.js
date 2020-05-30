import React from "react";
import About from "./containers/About";

export default [
	{
		path: "/about",
		exact: true,
		component: () => <About />
	},
];
