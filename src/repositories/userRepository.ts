import { injectable } from 'tsyringe';
import { User } from '../models/user';
import {Product} from '../models/product';

@injectable()// inyeccion de dependencias
export default class UserRepository {
    async findAll() {
        return await User.findAll( {attributes: ['id','name', 'email','estate']} );
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async create(user: Partial<User>) {
        return await User.create(user);
    }

    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }
    async update(id: number, user: Partial<User>) {
        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        return await userToUpdate.update(user);
    }
    async delete(id: number) {
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            throw new Error('User not found');
        }
        return await userToDelete.destroy();
    }
    async setEstate(id: number, estate: boolean) {
        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        userToUpdate.estate = estate;
        return await userToUpdate.save();
    }
    //para consultar productos relazionados a un usuario
    async findUserWithProducts(userId: number) {
        return await User.findByPk(userId,{ attributes:["id","name","email","estate"],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price'] // selecciona las columnas específicas que necesitas
                }
            ]
        });
    }
}
