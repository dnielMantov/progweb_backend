import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class UserController {
    async createUser(request: Request, response: Response) {
        const { nome, email } = request.body;

        try {

          const user = await prismaClient.user.create({
            data: {
              nome,
              email
            },
          });
      
          return response.status(200).json(user);
        } catch (error) {
          console.error('Error creating user:', error);
          return response.status(500).json({ error: "An error occurred while fetching the user." });
        }
    }

    async deleteUser(request: Request, response: Response) {
      const { id } = request.params;

      try {
          const deletedUser = await prismaClient.user.delete({
              where: { id: parseInt(id) },
          });

          return response.status(200).json(deletedUser);
      } catch (error) {
          return response.status(500).json({ error: "An error occurred while deleting the user." });
      }   
    }

    async getUserById(request: Request, response: Response){
      const { id } = request.params

      try {
          const user = await prismaClient.user.findUnique({
              where: { id: Number(id), type: 'User' }
          })

          if (!user) {
              return response.status(404).json({ error: "User not found." })
          }

          return response.status(200).json(user)
      } catch (error) {
          return response.status(500).json({ error: "An error occurred while fetching the user." })
      }
    }

    async getUsers(response: Response) {
      try {
          const users = await prismaClient.user.findMany({
              where: { type: 'User' },
          });
          return response.status(200).json(users);
      } catch (error) {
          return response.status(500).json({ error: "An error occurred while fetching users." });
      }
    }

    
}