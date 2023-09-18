import { Request, Response } from "express";
import { generateToken } from "../config/tokens";

import { userRequest } from "../interfaces/user.interface";
import User from "../models/User";

import {
  create_user,
  login_user,
  change_password,
  addSearchHistory,
} from "../services/user.services";

import { handleHttp } from "../utils/error.handle";

const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await create_user(user);
    res.status(201).send(response);
  } catch (e) {
    handleHttp(res, "ERROR USER REGISTER");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.sendStatus(401);
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return res.sendStatus(401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };

    const token = generateToken(payload);

    res.status(201).json({
      error: false,
      message: "login successfully",
      user: { ...payload, token },
    });
  } catch (e) {
    handleHttp(res, "ERROR USER REGISTER");
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.status(204).send({});
  } catch (err) {
    handleHttp(res, "ERROR LOGOUT USER");
  }
};

const validation = async (req: userRequest, res: Response) => {
  try {
    res.send(req.user);
  } catch (e) {
    handleHttp(res, "ERROR USER VALIDATION");
  }
};

const changePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await change_password(id, data);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "ERROR GET USER");
  }
};

const addToSearchHistory = async (req: Request, res: Response) => {
  try {
    const { userId, query } = req.body;

    await addSearchHistory(userId, query);

    res.status(200).json({
      error: false,
      message: "Search history added successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: true,
      message: "Error adding search history",
    });
  }
};

export {
  register,
  login,
  logout,
  validation,
  changePassword,
  addToSearchHistory,
};
