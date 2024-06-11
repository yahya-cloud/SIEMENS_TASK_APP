import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import TaskApp, { Task } from "../../TaskApp";
import Form from "../Form/Form";
import TaskElement from "./TaskElement";

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
					<Grid key={el.id} item xs={3}>
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

export default TaskList;
