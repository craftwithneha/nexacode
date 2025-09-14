
import { Client, Account } from 'appwrite';
import { env } from './env';

const client = new Client();

client
  .setEndpoint(env.APPWRITE_ENDPOINT) 
  .setProject(env.APPWRITE_PROJECT_ID); 

export const account = new Account(client);
