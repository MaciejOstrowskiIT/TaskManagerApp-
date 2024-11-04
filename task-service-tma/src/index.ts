import express, { Application } from 'express';
import cors from 'cors';
import { logger } from './utils/logs';
import { MongoClient } from 'mongodb';
import { TaskType } from './models/Task';
import { TaskController } from './controllers/Controller';
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

(async (): Promise<void> => {
  try {
    const mongoClient = await new MongoClient(process.env.MONGO_URL!).connect();

    const database = mongoClient.db('TMA');
    app.listen(process.env.PORT, (): void => {
      logger('info', `[Task] Working at port ${process.env.PORT}`);
    });

    const collection = database.collection<TaskType>(process.env.COLLECTION_NAME!);
    const taskController = new TaskController(collection);
    app.get('/api/users/:id/tasks', async (req, res) => await taskController.getTasks(req, res));
    app.post('/api/users/:id/tasks', async (req, res) => await taskController.addTask(req, res));
    app.patch(
      '/api/users/:id/tasks/:taskId',
      async (req, res) => await taskController.updateTaskStatus(req, res)
    );
  } catch (error) {
    logger('error', error as string);
  }
})();
