import { Request, Response } from "express";
import { container } from "tsyringe";
import UserService from "../services/userService";


export default class UserController {
  static async getAllUsers(_: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.getUserById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error:any) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map((e: any) => e.message) });
      }
      res.status(500).json({ error: error.message });
      
    }
  }
  static async updateUser(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.updateUser(parseInt(req.params.id), req.body);
      res.json(user);
    } catch (error:any) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map((e: any) => e.message) });
      }
      res.status(500).json({ error: error.message });
      
    }
  }
  static async deleteUser(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      await userService.deleteUser(parseInt(req.params.id));
      res.status(204).send();
    } catch (error:any) {
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
  static async enableUser(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.enableUser(parseInt(req.params.id));
      res.json(user);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async disableUser(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.disableUser(parseInt(req.params.id));
      res.json(user);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  //obtener productos
  static async getUserWithProducts(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const user = await userService.getUserWithProducts(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

  
}
