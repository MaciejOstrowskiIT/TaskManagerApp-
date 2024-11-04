import express, { Application } from 'express';
import cors from 'cors';
import { logger } from './utils/logs';
import { MongoClient } from 'mongodb';
import { UserType } from './models/User';
import { UserController } from './controllers/Controller';
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
      logger('info', `[User-Service] Working at port ${process.env.PORT}`);
    });

    const collection = database.collection<UserType>(process.env.COLLECTION_NAME!);
    const usersController = new UserController(collection);
    app.get('/get-user-id/:userID', async (req, res) => await usersController.getUserId(req, res));
  } catch (error) {
    logger('error', error as string);
  }
})();
