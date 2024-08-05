"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const userService_1 = __importDefault(require("../services/userService"));
const tsyringe_2 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return false;
        }
        return await bcrypt_1.default.compare(password, user.password);
    }
    //login con token
    async checkUserCredentials(email, password) {
        const userService = tsyringe_2.container.resolve(userService_1.default);
        const user = await userService.getUserByEmail(email);
        if (user && await bcrypt_1.default.compare(password, user.password)) {
            return user;
        }
        throw new Error("Invalid credentials");
    }
};
AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [userRepository_1.default])
], AuthService);
exports.default = AuthService;
