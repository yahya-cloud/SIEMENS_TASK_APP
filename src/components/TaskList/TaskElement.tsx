import React from "react";
import {
	Typography,
	Card,
	CardContent,
	CardActions,
	Button,
	Stack,
} from "@mui/material";

type TaskElementProps = {
	title: string;
	description: string;
	date: string;
	status: string;
	id: string;
	deleteHandler: (id: string) => void;
	editHandler: (
		title: string,
		description: string,
		date: string,
		status: string,
		id: string
	) => void;
};

const TaskElement = (props: TaskElementProps) => {
	const getStatusColor = (): string => {
		let statusColor = "";
		switch (props.status) {
			case "To Do":
				statusColor = "#6A5ACD";
				break;

			case "In Process":
				statusColor = "#8B8000";
				break;

			default:
				statusColor = "#32CD32";
				break;
		}
		return statusColor;
	};

	return (
		<Card sx={{ minHeight: 225, textAlign: "left" }}>
			<CardContent>
				<Typography fontWeight={700} gutterBottom variant="h5" component="div">
					{props.title}
				</Typography>
				<Stack direction={"row"} justifyContent={"space-between"}>
					<Typography fontWeight={500} variant="caption" gutterBottom>
						Due Date: {props.date}
					</Typography>
					<Typography
						fontWeight={700}
						color={getStatusColor()}
						variant="caption"
						gutterBottom
					>
						{props.status}
					</Typography>
				</Stack>
				<Typography variant="body2" color="text.secondary">
					{props.description}
				</Typography>
			</CardContent>
			<CardActions sx={{ marginBottom: 0 }}>
				<Button
					onClick={() =>
						props.editHandler(
							props.title,
							props.description,
							props.date,
							props.status,
							props.id
						)
					}
					size="small"
				>
					Edit
				</Button>
				<Button onClick={() => props.deleteHandler(props.id)} size="small">
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default TaskElement;
