import {Body, Injectable} from '@nestjs/common';
import {UpdateUserDto, UserDto} from './dto/user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
    }

    //TODO : add response type
    async create(@Body() createUserDto: UserDto) {
        try {
            console.log("BODY RECEIVED :", createUserDto)
            const result = await this.userRepository.save(createUserDto);
            return {
                message: result
            }
        } catch (e) {
            console.log("ERR IN CREATE USER: ", e);
            throw e
        }
    }

    async findAll() {
        try {
            const result = await this.userRepository.find();
            return {
                message: result
            }
        } catch (e) {
            console.log("ERR IN FIND ALL USERS: ", e);
            throw e
        }

    }

    async findOne(userName: string): Promise<UserDto> {
        try {
            return await this.userRepository.findOneBy({userName});
        } catch (e) {
            console.log("ERR IN FIND ONE USER: ", e);
            throw e
        }
    }

    async update(userName: string, updateUserDto: UpdateUserDto) {
        try {
            return await this.userRepository.update(userName, updateUserDto);
        } catch (e) {
            console.log("ERR IN UPDATE USER: ", e);
            throw e
        }
    }

    async remove(userName: string) {
        try {
            return await this.userRepository.delete(userName);
        } catch (e) {
            console.log("ERR IN REMOVE USER: ", e);
            throw e
        }
    }
}
