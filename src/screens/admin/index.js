import React from "react";
import Admin from "./containers/Admin";

export default [
	{
		path: "/admin/:path",
		exact: true,
		component: () => <Admin />
	}
];
