import React from "react";
import Admin from "./containers/Admin";

export default [
	{
		path: "/admin",
		exact: true,
		component: () => <Admin />
	},
];
