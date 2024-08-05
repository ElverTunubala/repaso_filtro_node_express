"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    static async getAllUsers(_, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getUserById(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const user = await userService.getUserById(parseInt(req.params.id));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async createUser(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ errors: error.errors.map((e) => e.message) });
            }
            res.status(500).json({ error: error.message });
        }
    }
    static async updateUser(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const user = await userService.updateUser(parseInt(req.params.id), req.body);
            res.json(user);
        }
        catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ errors: error.errors.map((e) => e.message) });
            }
            res.status(500).json({ error: error.message });
        }
    }
    static async deleteUser(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            await userService.deleteUser(parseInt(req.params.id));
            res.status(204).send();
        }
        catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    static async enableUser(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const user = await userService.enableUser(parseInt(req.params.id));
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async disableUser(req, res) {
        try {
            const userService = tsyringe_1.container.resolve(userService_1.default);
            const user = await userService.disableUser(parseInt(req.params.id));
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = UserController;
