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
const Contact_1 = require("../models/Contact");
const typeorm_1 = require("typeorm");
let ContactController = class ContactController {
    getRepo() {
        return typeorm_1.getConnection().getRepository(Contact_1.default);
    }
    async getAll() {
        let contacts = await this.getRepo().find();
        return contacts;
    }
    async search(query) {
        let results = await this.getRepo().createQueryBuilder("c").
            where("c.firstName ILIKE :query", { query: query }).
            orWhere("c.lastName ILIKE :query", { query: query }).
            getMany();
        return results;
    }
    async getOne(id) {
        let contact = await this.getRepo().findOneById(id);
        return contact;
    }
    async post(contact) {
        return await this.getRepo().persist(contact);
    }
    async put(id, contact) {
        let existingContact = await this.getRepo().findOneById(id);
        if (existingContact) {
            Object.assign(existingContact, contact);
            this.getRepo().persist(existingContact);
            return existingContact;
        }
    }
    async remove(id) {
        let existingContact = await this.getRepo().findOneById(id);
        if (!existingContact) {
            throw new routing_controllers_1.NotFoundError("Not found");
        }
        else {
            let result = await this.getRepo().remove(existingContact);
        }
    }
};
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/search"),
    __param(0, routing_controllers_1.QueryParam("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "search", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Contact_1.default]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    routing_controllers_1.OnUndefined(404),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Contact_1.default]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    routing_controllers_1.OnUndefined(204),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "remove", null);
ContactController = __decorate([
    routing_controllers_1.JsonController("/api/contacts")
], ContactController);
exports.default = ContactController;
//# sourceMappingURL=ContactController.js.map