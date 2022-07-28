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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        try {
            console.log("BODY RECEIVED :", createUserDto);
            return await this.userRepository.save(createUserDto);
        }
        catch (e) {
            console.log("ERR IN CREATE USER: ", e);
            throw e;
        }
    }
    async findAll() {
        try {
            return await this.userRepository.find();
        }
        catch (e) {
            console.log("ERR IN FIND ALL USERS: ", e);
            throw e;
        }
    }
    async findOne(userName) {
        try {
            return await this.userRepository.findOneBy({ userName });
        }
        catch (e) {
            console.log("ERR IN FIND ONE USER: ", e);
            throw e;
        }
    }
    async update(id, updateUserDto) {
        try {
            await this.userRepository.update(id, updateUserDto);
            return {
                message: 'Successfully updated'
            };
        }
        catch (e) {
            console.log("ERR IN UPDATE USER: ", e);
            throw e;
        }
    }
    async remove(id) {
        try {
            await this.userRepository.delete(id);
            return {
                message: 'Successfully deleted'
            };
        }
        catch (e) {
            console.log("ERR IN REMOVE USER: ", e);
            throw e;
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map