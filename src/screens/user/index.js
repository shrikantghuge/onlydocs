import React from "react";
import User from "./containers/User";

export default [
	{
		path: "/user",
		exact: true,
		component: () => <User />
	},
];
