import User from "../models/User";
import bcrypt from "bcrypt";
import { SearchHistoryEntry } from "types/user.types";

const create_user = async (user: any) => {
  try {
    const createdUser = await User.create(user);
    return createdUser;
  } catch (e) {
    return e;
  }
};

const login_user = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (e) {
    return e;
  }
};

const change_password = async (id: any, data: any) => {
  const { password } = data;
  const userToUpdate = await User.findById(id);
  const salt = await bcrypt.genSalt();
  const hash = await userToUpdate?.hashedPassword(password, salt);

  const updatedUser = await userToUpdate?.updateOne({
    salt: salt,
    password: hash,
  });

  return updatedUser;
};

const addSearchHistory = async (userId: string, query: string) => {
  const user = await User.findById(userId);

  if (user) {
    const searchHistoryEntry: SearchHistoryEntry = {
      query,
      timestamp: new Date(),
    };

    user.searchHistory.unshift(searchHistoryEntry); // Agrega la entrada al principio del historial

    if (user.searchHistory.length > 10) {
      // Limita el historial a las últimas 10 consultas
      user.searchHistory.pop();
    }

    await user.save();
  }
};

export { create_user, login_user, change_password, addSearchHistory };
