import * as userService from "../services/user.services.js";

const getErrorMessage = (error) => {
  let msg = error && error.message ? error.message : '';
  if (!msg && error && error.errors && Array.isArray(error.errors)) {
    msg = error.errors.map((e) => e && (e.message || e.code) ? (e.message || e.code) : String(e)).join(' | ');
  }
  if (!msg) msg = String(error);
  return msg;
};

export const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const create = async (req, res) => {
  try {
    const { email, username, password_hash, first_name, last_name } = req.body;
    if (!email) return res.status(400).json({ message: "'email' is required" });
    if (!username) return res.status(400).json({ message: "'username' is required" });
    if (!password_hash) return res.status(400).json({ message: "'password_hash' is required" });
    
    const created = await userService.createUser({ email, username, password_hash, first_name, last_name });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, first_name, last_name } = req.body;
    const updated = await userService.updateUser(id, { email, username, first_name, last_name });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
