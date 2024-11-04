import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { UserType } from '../models/User';

export class UserController {
  constructor(private collection: Collection<UserType>) {}

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    console.log(userId);

    try {
      const user = await this.collection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { _id: 1, name: 1, email: 1, createdDate: 1, address: 1, phone: 1 } }
      );

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ status: '400', message: error });
    }
  }
}
