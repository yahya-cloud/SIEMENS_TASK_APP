import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

type Fields = "title" | "description" | "date" | "status";
type Props = {
	value: string;
	handleChange: (type: Fields, value: string) => void;
};

const SelectInput = (props: Props) => {
	return (
		<FormControl sx={{ mb: 4 }} fullWidth>
			<InputLabel color="primary" id="demo-simple-select-helper-label">
				Status
			</InputLabel>
			<Select
				color="primary"
				variant="outlined"
				labelId="demo-simple-select-helper-label"
				id="demo-simple-select-helper"
				value={props.value}
				label="Age"
				onChange={(e) => props.handleChange("status", e.target.value)}
			>
				{names.map((el) => (
					<MenuItem value={el}>{el}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

const names = ["To Do", "In Process", "Done"];

export default SelectInput;
