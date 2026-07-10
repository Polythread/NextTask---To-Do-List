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
