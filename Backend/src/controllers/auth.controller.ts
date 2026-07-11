import type { Request, Response } from "express";
import user from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const emailExist = await user.findOne({ email });
    if (emailExist) {
      return res.status(400).send("This User Already Exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    const result = await user.findOne({ email }).select("");

    return res.status(201).send({ message: "User Created!", result });
  } catch (error) {
    console.error(error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const emailExist = await user.findOne({ email }).select("+password");
    if (!emailExist) {
      return res.status(400).send("Incorrect Credentials");
    }

    const validPass = await bcrypt.compare(password, emailExist.password);
    if (!validPass) {
      return res.status(400).send("Incorrect Credentials");
    }

    const token = jwt.sign(
      {
        id: emailExist._id,
        email,
      },
      config.jwt_key,
    );
    res.status(200).json({ message: "You are logged in!", token });
  } catch (error) {
    console.error(error);
  }
};
