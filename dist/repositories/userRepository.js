"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_1 = require("../models/user");
let UserRepository = class UserRepository {
    async findAll() {
        return await user_1.User.findAll();
    }
    async findById(id) {
        return await user_1.User.findByPk(id);
    }
    async create(user) {
        return await user_1.User.create(user);
    }
    async findByEmail(email) {
        return await user_1.User.findOne({ where: { email } });
    }
    async update(id, user) {
        const userToUpdate = await user_1.User.findByPk(id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        return await userToUpdate.update(user);
    }
    async delete(id) {
        const userToDelete = await user_1.User.findByPk(id);
        if (!userToDelete) {
            throw new Error('User not found');
        }
        return await userToDelete.destroy();
    }
    async setEstate(id, estate) {
        const userToUpdate = await user_1.User.findByPk(id);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        userToUpdate.estate = estate;
        return await userToUpdate.save();
    }
};
UserRepository = __decorate([
    (0, tsyringe_1.injectable)() // inyeccion de dependencias
], UserRepository);
exports.default = UserRepository;
