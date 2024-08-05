import { injectable } from 'tsyringe';
import { User } from "../models/user";
import UserService from "../services/userService";
import { container } from "tsyringe";
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository';

@injectable()
export default class AuthService {
  constructor(private userRepository: UserRepository) {}
  
  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }

  //login con token
  async checkUserCredentials(email: string,password: string): Promise<User> {
    
    const userService = container.resolve(UserService);
    const user = await userService.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new Error("Invalid credentials");
  }
}
