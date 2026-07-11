import type { Request, Response } from "express";
import task from "../models/task";

export const addTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    const Task = await task.create({
      title,
      description,
      userId,
    });

    return res.status(200).send({ message: "Task Created!", Task });
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const Tasks = await task.find({
      userId: req.userId,
    });
    if (!Tasks) {
      return res
        .status(400)
        .json({ message: "Cannot find any task for this User!", Tasks: [] });
    }

    return res.status(200).json({ message: "Tasks by the User:", Tasks });
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    const { title, description, status } = req.body;

    const updatedTask = await task.findOneAndUpdate(
      {
        _id: taskId,
        userId,
      },
      {
        title,
        description,
        status,
      },
      {
        new: true,
      },
    );

    if (!updatedTask) {
      return res.status(400).send("Task Not Found!");
    }

    return res.status(200).send({ message: "Task Updated!", updatedTask });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    const deletingTask = await task.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!deletingTask) {
      return res.status(400).send("Task Not Found!");
    }

    return res.status(200).send({
      message: "Task deleted successfully!",
    });
  } catch (error) {
    console.error(error);
  }
};
