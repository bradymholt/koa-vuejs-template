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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const jwt = require("jsonwebtoken");
const AuthCredentials_1 = require("../models/AuthCredentials");
let ContactController = class ContactController {
    async login(credentials) {
        if (credentials.username === "user@test.com" && credentials.password === "P2ssw0rd!") {
            let config = require('../config.json');
            let token = jwt.sign({
                role: 'user',
            }, config.jwtKey);
            return token;
        }
        else {
            throw new routing_controllers_1.UnauthorizedError();
        }
    }
};
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthCredentials_1.default]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "login", null);
ContactController = __decorate([
    routing_controllers_1.JsonController("/api/auth")
], ContactController);
exports.default = ContactController;
//# sourceMappingURL=AuthController.js.map