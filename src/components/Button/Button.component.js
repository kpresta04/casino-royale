import React from "react";
import Button from "@material-ui/core/Button";

export default function MaterialButton(props) {
	return (
		<Button variant="contained" color="primary" disableElevation>
			{props.text}
		</Button>
	);
}
