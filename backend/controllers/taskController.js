import { customError } from "../middleware/errorHandler.js";
import { TaskModel } from "../models/Task.js";

export const createTask = async (req, res, next) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    if (!title) {
      return next(customError(422, "Required fields are missing"));
    }

    const newTask = new TaskModel({ title, description, status, user: userId });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  const { role, id } = req.user;
  try {
    const query = {};

    if (role !== "admin") {
      query.user = id;
      query.isDeleted = false;
    }

    const allTasks = await TaskModel.find(query);
    res.status(200).json({
      message: "Task Successfully retrived",
      success: true,
      data: allTasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    res.status(200).json({
      message: "Task Successfully updated",
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const { role, id: userId } = req.user;

  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return next(customError(404, "Task not found"));
    }

    if (task.user.toString() !== userId && role !== "admin") {
      return next(
        customError(
          403,
          "Forbidden: You are not authorized to modify this task"
        )
      );
    }
    if (role === "admin") {
      await TaskModel.findByIdAndDelete(taskId);

      res
        .status(200)
        .json({ message: "Task deleted successfully", success: true });
    } else {
      task.isDeleted = true;
      task.deletedAt = new Date();

      await task.save();

      res.status(200).json({
        message: "Task has been removed",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
