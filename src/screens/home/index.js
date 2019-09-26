import React from "react";
import Home from "./containers/Home";

export default [
	{
		path: "/",
		exact: true,
		component: () => <Home />
	},
];
