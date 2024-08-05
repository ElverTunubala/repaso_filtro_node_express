import UserRepository from "../repositories/userRepository";
import { injectable, inject } from "tsyringe";
import { User } from "../models/user";

@injectable()
export default class UserService {
  constructor(@inject(UserRepository) 
  private userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number) {
    try {
      return await this.userRepository.findById(id);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async createUser(user: Partial<User>) {
    try {
      return await this.userRepository.create(user);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
  async updateUser(id: number, user: Partial<User>) {
    try {
      return await this.userRepository.update(id, user);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
  async deleteUser(id: number) {
    try {
      await this.userRepository.delete(id);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
  async enableUser(id: number) {
    try {
      return await this.userRepository.setEstate(id, true);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async disableUser(id: number) {
    try {
      return await this.userRepository.setEstate(id, false);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  //obtener productos
  async getUserWithProducts(userId: number) {
    return await this.userRepository.findUserWithProducts(userId);
  }

  
}



/**
 * @injectable() es un decorador que indica que la clase es un servicio que puede ser inyectado en otras clases.
 * @inject(UserRepository) es un decorador que indica que el parámetro userRepository del constructor debe ser resuelto por el contenedor de inyección de dependencias.
 * El contenedor de inyección de dependencias se encarga de crear una instancia de la clase UserService y de inyectar una instancia de UserRepository en el parámetro userRepository del constructor.
 *
 * Partial se utiliza para definir un tipo que tiene todas las propiedades de otro tipo como opcionales.
 */
