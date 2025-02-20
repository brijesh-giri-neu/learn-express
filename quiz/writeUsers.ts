import express, { Response } from 'express';
import  { promises as fsPromises } from 'fs';
import path from 'path';
import { UserRequest } from './types';

const router = express.Router()

const writeFile = '../data/users.json';

// a route that receives a user object and saves it to the user data file
router.post('/adduser', async (req: UserRequest, res: Response) => {
  try {
    let newUser = req.body;
    req.users?.push(newUser);

    await fsPromises.writeFile(
      path.resolve(__dirname, writeFile), 
      JSON.stringify(req.users)
    );
    
    console.log('User Saved');
    res.send('done');
  } catch (err) {
    console.log('Failed to write:', err);
    res.status(500).send('Error saving user');
  }
});

export default router;