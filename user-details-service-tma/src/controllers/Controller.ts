import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { logger } from '../utils/logs';
import { UserType } from '../models/User';
import { IController } from '../interfaces/IControllerInterface';

export class UserController implements IController {
  endpoint = process.env.USERS_SERVICE!;
  constructor(private collection: Collection<UserType>) {}

  public async getUserId(req: Request, res: Response): Promise<void> {
    console.log(req.params.id);
    try {
      const result = await this.collection.findOne(
        { _id: req.params.id as unknown as ObjectId },
        { projection: { profile: 1 } }
      );
      res.status(200).json(result);
    } catch (error) {
      res.json({ status: '400', message: error });
    }
  }

  //   public async getUserData(req: Request, res: Response): Promise<void> {
  //     try {
  //       const userId = new ObjectId(req.params.id);
  //       // const userId = req.params.id as unknown as ObjectId
  //       console.log('userId ', userId);
  //       const result = await this.accountsCollection.findOne({ userId: userId });
  //       logger('info', JSON.stringify(result));
  //       res.status(200).json(result);
  //     } catch (error) {
  //       res.json({ status: '400', message: error });
  //     }
  //   }
}
