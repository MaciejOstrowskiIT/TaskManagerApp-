import express, { Application } from 'express';
import cors from 'cors';
import { logger } from './utils/logs';
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

(async (): Promise<void> => {
  try {
    // const exchanges: Exchange[] = [{ name: 'transactions', queues: ['create-transactions'] }];
    // const amqp = new AMQP(exchanges, 'gateway');
    // await amqp.config();
    app.listen(process.env.PORT, (): void => {
      logger('info', `[Gateway] Working at port ${process.env.PORT}`);
    });

  } catch (error) {
    logger('error', error as string);
  }
})();
