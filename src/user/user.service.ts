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
    async create(@Body() createUserDto: UserDto): Promise<UserDto> {
        try {
            console.log("BODY RECEIVED :", createUserDto)
            return await this.userRepository.save(createUserDto);
        } catch (e) {
            console.log("ERR IN CREATE USER: ", e);
            throw e
        }
    }

    async findAll(): Promise<UserDto[]> {
        try {
            return await this.userRepository.find();
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

    async update(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
        try {
            await this.userRepository.update(id, updateUserDto);
            return {
                message: 'Successfully updated'
            }

        } catch (e) {
            console.log("ERR IN UPDATE USER: ", e);
            throw e
        }
    }

    async remove(id: number): Promise<Object> {
        try {
            await this.userRepository.delete(id);
            return {
                message: 'Successfully deleted'
            }
        } catch (e) {
            console.log("ERR IN REMOVE USER: ", e);
            throw e
        }
    }
}
