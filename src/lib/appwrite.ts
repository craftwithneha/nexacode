
import { Client, Account } from 'appwrite';
import { env } from './env';

const client = new Client();

// Set endpoint and project with fallbacks
client
  .setEndpoint(env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '') 
  .setProject(env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''); 

export const account = new Account(client);

// Add error handling for Appwrite operations
export const appwriteErrorHandler = (error: unknown) => {
  console.error('Appwrite Error:', error);
  
  if (error && typeof error === 'object' && 'code' in error) {
    const appwriteError = error as { code: number; message?: string };
    
    if (appwriteError.code === 401) {
      return 'Authentication failed. Please check your credentials.';
    } else if (appwriteError.code === 403) {
      return 'Access denied. Please contact support.';
    } else if (appwriteError.code === 404) {
      return 'Service not found. Please try again later.';
    } else if (appwriteError.code === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    } else if (appwriteError.message) {
      return appwriteError.message;
    }
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};
