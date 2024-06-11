import React, { FormEvent, useEffect, useState } from "react";

import { TextField, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Modal, ModalContent, StyledBackdrop } from "./style";
import SelectInput from "./SelectInput";

type Props = {
	show: boolean;
	closeHandler: () => void;
	formHandler: (
		description: string,
		status: string,
		title: string,
		date: string
	) => void;
	initialData: Data;
	btnText: string;
};

type Data = {
	title: string;
	description: string;
	date: string;
	status: string;
	id: string;
};

type Fields = "title" | "description" | "date" | "status";

const Form = (props: Props) => {
	const [data, setData] = useState({ ...props.initialData });

	useEffect(() => {
		setData({ ...props.initialData });
	}, [props.initialData]);

	const handleClose = () => {
		props.closeHandler();
	};

	const handleChange = (type: Fields, value: string) => {
		let updatedData: Data = { ...data };
		updatedData[type] = value;
		setData(updatedData);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		props.formHandler(data.description, data.status, data.title, data.date);
		setData({ description: "", status: "", title: "", date: "", id: "" });
		props.closeHandler();
	};

	return (
		<div>
			<Modal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={props.show}
				onClose={handleClose}
				slots={{ backdrop: StyledBackdrop }}
			>
				<ModalContent sx={{ width: 400 }}>
					<form onSubmit={(e) => handleSubmit(e)}>
						<TextField
							type="text"
							variant="outlined"
							color="primary"
							label="Title"
							onChange={(e) => handleChange("title", e.target.value)}
							value={data.title}
							fullWidth
							required
							sx={{ mb: 4 }}
						/>
						<TextField
							type="text"
							variant="outlined"
							color="primary"
							label="Description"
							onChange={(e) => handleChange("description", e.target.value)}
							value={data.description}
							required
							fullWidth
							sx={{ mb: 4 }}
						/>

						<SelectInput value={data.status} handleChange={handleChange} />

						<TextField
							type="date"
							variant="outlined"
							color="primary"
							onChange={(e) => handleChange("date", e.target.value)}
							value={data.date}
							fullWidth
							required
							sx={{ mb: 4 }}
						/>
						<Button
							endIcon={<AddBoxIcon />}
							variant="outlined"
							color="primary"
							type="submit"
						>
							{props.btnText}
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Form;
