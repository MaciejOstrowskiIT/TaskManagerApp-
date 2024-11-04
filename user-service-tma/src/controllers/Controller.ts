import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { logger } from '../utils/logs';
import { UserType } from '../models/User';
import { IController } from '../interfaces/IControllerInterface';

export class UserController implements IController {
  endpoint = process.env.USERS_SERVICE!;
  constructor(private collection: Collection<UserType>) {}
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const sortBy = req.query.sortBy === 'name' ? 'name' : 'createdDate';
      const order = req.query.order === 'desc' ? -1 : 1;

      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const users = await this.collection
        .find({})
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(pageSize)
        .toArray();

      const formattedUsers = users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdDate: user.createdDate,
      }));

      res.status(200).json(formattedUsers);
    } catch (error) {
      logger('error', `getUsers error: ${error}`);
      res.status(400).json({ status: '400', message: error });
    }
  }
}
