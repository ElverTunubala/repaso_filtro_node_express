import { container } from "tsyringe";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import AuthService from "../services/auth.Service"

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authService = container.resolve(AuthService);
      const user: User = await authService.checkUserCredentials(email,password);
      // Generar token JWT
      const token = AuthController.generateToken({id: user.id,username: user.email,});
      res.status(200).json({ status: 200, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static generateToken = (user: { id: number; username: string }) => {
    const token = jwt.sign(user, "secret", { expiresIn: "1h" });
    return token;
  };
}
