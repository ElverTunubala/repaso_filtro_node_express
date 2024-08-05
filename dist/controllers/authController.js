"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_Service_1 = __importDefault(require("../services/auth.Service"));
class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const authService = tsyringe_1.container.resolve(auth_Service_1.default);
            const user = await authService.checkUserCredentials(email, password);
            // Generar token JWT
            const token = AuthController.generateToken({
                id: user.id,
                username: user.email,
            });
            res.status(200).json({ status: 200, token });
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}
AuthController.generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, "secret", { expiresIn: "1h" });
    return token;
};
exports.default = AuthController;
