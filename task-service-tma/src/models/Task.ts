import { ObjectId } from 'mongodb';

export interface TaskType {
  _id: ObjectId;
  userId: ObjectId;
  description: string;
  createdDate: string;
  status: string;
}
