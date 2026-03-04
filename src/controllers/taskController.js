import Task from "../models/Task.js";

// Create a new task for the authenticated user
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      owner: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
  }
};

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a task only if the owner matches
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
