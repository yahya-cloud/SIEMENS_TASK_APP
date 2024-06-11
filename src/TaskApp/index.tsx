import dummyTasks from "./dummytasks";

export class Task {
	description: string;
	status: string;
	title: string;
	date: string;
	id: string;

	constructor(
		description: string,
		status: string,
		title: string,
		date: string,
		id: string
	) {
		this.description = description;
		this.status = status;
		this.title = title;
		this.date = date;
		this.id = id;
	}

	setData(data: Data) {
		this.description = data.description;
		this.title = data.title;
		this.date = data.date;
		this.status = data.status;
	}

	toString() {
		return `${this.status ? "[Completed]" : "[Not Completed]"} ${
			this.description
		}`;
	}
}

class ToDoListApp {
	tasks: Map<string, Task> = new Map<string, Task>();
	length: number = 0;

	constructor() {
		this.tasks = new Map();
	}

	addTask(description: string, status: string, title: string, date: string) {
		const id = this.generateId();
		this.tasks.set(id, new Task(description, status, title, date, id));
		this.length++;
		console.log(`Task added with ID: ${id}`);
	}

	deleteTask(id: string) {
		if (this.tasks.delete(id)) {
			this.length--;
			console.log("Task deleted.");
		} else {
			console.log("Invalid task ID.");
		}
	}

	deleteAllTask() {
		this.tasks.clear();
		this.length = 0;
	}

	editTask(id: string, newData: Data) {
		const task = this.tasks.get(id);
		if (!task) {
			console.log("Invalid task ID.");
		} else {
			task.setData(newData);
			console.log("Task edited.");
		}
	}

	getAllTasks(): Task[] {
		let taskArr: Task[] = [];

		if (this.tasks.size > 0) {
			this.tasks.forEach((task: Task, id) => {
				taskArr.push(task);
			});
		}

		return taskArr;
	}

	generateId() {
		return Math.random().toString(36).slice(2, 9);
	}

	addDummyTasks() {
		dummyTasks.forEach((el) =>
			this.addTask(el.description, el.status, el.title, el.date)
		);
	}
}

type Data = {
	title: string;
	description: string;
	date: string;
	status: string;
};

// Simulate user interaction
const app = new ToDoListApp();
app.addDummyTasks();

export default app;
