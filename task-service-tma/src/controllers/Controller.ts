import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { TaskType } from '../models/Task';
import { IController } from '../interfaces/IControllerInterface';

export class TaskController implements IController {
  endpoint = process.env.USERS_SERVICE!;

  constructor(private collection: Collection<TaskType>) {}

  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = new ObjectId(req.params.id!);
      const page = parseInt(req.query.page as string) || 1;
      const sortBy = req.query.sortBy === 'status' ? 'status' : 'createdDate';
      const order = req.query.order === 'desc' ? -1 : 1;
      const filter = req.query.filter as 'resolved' | 'unresolved' | undefined;

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const query: any = { userId };
      if (filter) {
        query.status = filter;
      }

      const tasks = await this.collection
        .find(query)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(pageSize)
        .toArray();

      const totalCount = await this.collection.countDocuments(query);
      const totalPages = Math.ceil(totalCount / pageSize);

      const formattedTasks = tasks.map((task) => ({
        id: task._id.toString(),
        description: task.description,
        createdDate: task.createdDate,
        status: task.status,
      }));

      res.status(200).json({ currentPage: page, totalPages, tasks: formattedTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ status: '500', message: 'Internal server error.' });
    }
  }

  public async addTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = new ObjectId(req.params.id!);
      const { description } = req.body;

      if (!description) {
        res.status(400).json({ message: 'Description is required.' });
      }

      const newTask: TaskType = {
        _id: new ObjectId(),
        userId,
        description,
        createdDate: new Date().toISOString(),
        status: 'unresolved',
      };

      const result = await this.collection.insertOne(newTask);
      res.status(201).json({
        id: result.insertedId.toString(),
        ...newTask,
      });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ status: '500', message: 'Internal server error.' });
    }
  }

  public async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = new ObjectId(req.params.id!);
      const taskId = new ObjectId(req.params.taskId);
      const { status } = req.body;

      if (!status) {
        res.status(400).json({ message: 'Status is required.' });
      }

      const updatedTask = await this.collection.findOneAndUpdate(
        { _id: taskId, userId },
        { $set: { status } },
        { returnDocument: 'after' }
      );

      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found.' });
        return
      }

      res.status(200).json({
        id: updatedTask._id.toString(),
        description: updatedTask.description,
        createdDate: updatedTask.createdDate,
        status: updatedTask.status,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      res.status(500).json({ status: '500', message: 'Internal server error.' });
    }
  }
}
