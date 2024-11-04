import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { UserType } from '../models/User';

dotenv.config();

const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

const generateRandomEmail = (name: string) => {
  const domains = ['example.com', 'test.com', 'sample.com', 'mail.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const emailName = name.toLowerCase().replace(' ', '.');

  return `${emailName}@${domain}`;
};

const generateRandomDate = (): string => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return date.toISOString().split('T')[0] || '';
};

const generateRandomAddress = () => {
  const streets = ['Main St', 'Second St', 'Third St', 'Fourth St', 'Fifth St'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const streetNumber = Math.floor(Math.random() * 1000) + 1;

  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];

  return `${streetNumber} ${street}, ${city}`;
};

const generateRandomPhone = () => {
  const areaCodes = ['212', '213', '312', '415', '510'];
  const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000); // 7 cyfr

  return `(${areaCode}) ${number.toString().slice(0, 3)}-${number.toString().slice(3)}`;
};

const generateRandomUsers = (count: number): UserType[] => {
  const users: UserType[] = [];

  for (let i = 0; i < count; i++) {
    const name = generateRandomName();
    users.push({
      id: '',
      name: name,
      email: generateRandomEmail(name),
      createdDate: generateRandomDate(),
      address: generateRandomAddress(),
      phone: generateRandomPhone(),
    });
  }

  return users;
};

const insertUsersToDb = async (users: UserType[]) => {
  const mongoClient = await new MongoClient('mongodb://localhost:27017').connect();
  const database = mongoClient.db('TMA');
  const collection = database.collection<UserType>('users');

  try {
    const result = await collection.insertMany(users);
    console.log(`Inserted ${result.insertedCount} users`);
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    await mongoClient.close();
  }
};

(async () => {
  const users = generateRandomUsers(100);
  await insertUsersToDb(users);
})();
