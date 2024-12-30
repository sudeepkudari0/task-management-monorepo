import { Request, Response } from "express";
import client from "../db/database";

interface Task {
  id: string;
  task_name: string;
  task_description: string;
  user_id: number;
}

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);

    const { task_name, task_description, id } = req.body as Task;

    const query =
      "INSERT INTO tasks (task_name, task_description, user_id) VALUES ($1, $2, $3) RETURNING *;";
    const values = [task_name, task_description, id];

    const result = await client.query(query, values);
    const task = result.rows[0];

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const query = "SELECT * FROM tasks WHERE user_id = $1;";
    const values = [id];

    const result = await client.query(query, values);
    const tasks = result.rows;

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
