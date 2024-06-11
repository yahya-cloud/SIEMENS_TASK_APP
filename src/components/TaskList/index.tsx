import React, { useEffect, useState } from "react";
import {
	Grid,
	Typography,
	Card,
	CardContent,
	CardActions,
	Button,
	Box,
	Stack,
} from "@mui/material";
import TaskApp, { Task } from "../../TaskApp";
import Form from "../Form/Form";

type Props = {
	tasks: Task[];
};

let initialData = {
	title: "",
	description: "",
	date: "",
	status: "",
	id: "",
};

const TaskList = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [taskData, setTaskData] = useState({ ...initialData });
	const [taskList, setTaskList] = useState<Task[]>([...props.tasks]);

	useEffect(() => {
		setTaskList(props.tasks);
	}, [props.tasks]);

	const handleClick = () => {
		if (open) setOpen(false);
		else setOpen(true);
	};

	const editHandler = (
		title: string,
		description: string,
		date: string,
		status: string,
		id: string
	) => {
		let newTask = { title, description, date, status, id };
		setTaskData(newTask);
		handleClick();
	};

	const deleteHandler = (id: string) => {
		TaskApp.deleteTask(id);
		setTaskList(TaskApp.getAllTasks());
	};

	const formHandler = (
		description: string,
		status: string,
		title: string,
		date: string
	) => {
		TaskApp.editTask(taskData.id, { description, status, title, date });
		handleClick();
	};

	return (
		<Box sx={{ marginTop: 10 }}>
			<Form
				initialData={taskData}
				formHandler={formHandler}
				closeHandler={handleClick}
				show={open}
				btnText="Edit Task"
			/>
			<Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{taskList.map((el) => (
					<Grid id={el.id} item xs={3}>
						<TaskElement
							editHandler={editHandler}
							deleteHandler={deleteHandler}
							title={el.title}
							description={el.description}
							date={el.date}
							status={el.status}
							id={el.id}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

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
				statusColor = "#FFFF33";
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

export default TaskList;
