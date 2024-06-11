import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Form from "../../components/Form/Form";
import "./index.css";
import TaskApp, { Task } from "../../TaskApp";
import TaskList from "../../components/TaskList";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";

let initialData = {
	title: "",
	description: "",
	date: "",
	status: "To Do",
	id: "",
};

const Main = () => {
	const [open, setOpen] = useState(false);
	const [taskListData, setTaskListData] = useState<Task[]>([]);

	useEffect(() => {
		setTaskListData(TaskApp.getAllTasks());
	}, []);

	const deleteTasks = () => {
		TaskApp.deleteAllTask();
		setTaskListData(TaskApp.getAllTasks());
	};

	const handleClick = () => {
		if (open) setOpen(false);
		else setOpen(true);
	};

	const formHandler = (
		description: string,
		status: string,
		title: string,
		date: string
	) => {
		TaskApp.addTask(description, status, title, date);
		setTaskListData(TaskApp.getAllTasks());
	};

	return (
		<div className="main_container">
			<Typography fontWeight={700} variant="h3" gutterBottom>
				SIEMENS TASKS LIST
			</Typography>

			<div className="btn_container">
				<Button
					onClick={handleClick}
					variant="contained"
					size="medium"
					sx={{ backgroundColor: "#0cc", marginRight: 2 }}
					endIcon={<AddBoxIcon />}
				>
					Add Task
				</Button>
				<Button
					variant="contained"
					size="medium"
					color="error"
					endIcon={<DeleteIcon />}
					onClick={deleteTasks}
				>
					Delete All
				</Button>
			</div>

			<Form
				initialData={initialData}
				formHandler={formHandler}
				closeHandler={handleClick}
				show={open}
				btnText="Add Task"
			/>

			<TaskList tasks={taskListData} />
		</div>
	);
};

export default Main;
