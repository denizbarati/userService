import {HttpException, HttpStatus, Injectable,} from '@nestjs/common';
import {UpdateUserDto, UserDto} from './dto/user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth/services/auth.service";
import {MESSAGES} from "../common/enum";
import {ERROR_MESSAGE} from "../common/enum/errorMsg";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {
    }

    async createUser(createUserDto: UserDto): Promise<UserDto> {
        try {
            const userName = createUserDto.userName
            console.log("BODY RECEIVED :", createUserDto)
            const isExistUser = await this.userRepository.findOneBy({userName})
            if (isExistUser) throw new HttpException(ERROR_MESSAGE.USER_EXIST, HttpStatus.BAD_REQUEST);
            const hashPassword = await this.authService.generatePassword(createUserDto.password)
            console.log("hashPassword", hashPassword)
            const newUser = new UserEntity()
            newUser.id = createUserDto.id
            newUser.userName = createUserDto.userName
            newUser.name = createUserDto.name
            newUser.email = createUserDto.email
            newUser.password = hashPassword
            const result = await this.userRepository.save(newUser);
            delete result?.password
            return result
        } catch (e) {
            console.log("ERR IN CREATE USER: ", e);
            throw e ? e : new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllUsers(): Promise<UserDto[]> {
        try {
            const result = await this.userRepository.find();
            result?.forEach(item => {
                delete item?.password
            })
            return result
        } catch (e) {
            console.log("ERR IN FIND ALL USERS: ", e);
            throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async findOneUser(userName: string): Promise<UserDto> {
        try {
            const result = await this.userRepository.findOneBy({userName});
            if (!result) throw new HttpException(ERROR_MESSAGE.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
            delete result?.password
            return result
        } catch (e) {
            console.log("ERR IN FIND ONE USER: ", e);
            throw e
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
        try {
            delete updateUserDto.password,
                delete updateUserDto.email

            await this.userRepository.update(id, updateUserDto);
            return {
                message: MESSAGES.SUCCESSFULLY_UPDATED
            }

        } catch (e) {
            console.log("ERR IN UPDATE USER: ", e);
            throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeUser(id: number): Promise<Object> {
        try {
            await this.userRepository.delete(id);
            return {
                message: MESSAGES.SUCCESSFULLY_DELETED
            }
        } catch (e) {
            console.log("ERR IN REMOVE USER: ", e);
            throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(user: UserDto) {
        try {
            const findUser = await this.validateUser(user.email, user.password)
            console.log("find user:", findUser)
            const jwt = await this.authService.generateJWT(findUser)
            return {
                message: jwt
            }
        } catch (e) {
            console.log("err", e)
            throw e ? e : new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.findUserByMail(email)
        if (!user) {
            throw new HttpException(ERROR_MESSAGE.USER_NOT_FOUND, HttpStatus.FORBIDDEN);
        }
        const comparePass = await this.authService.comparePassword(password, user.password)
        if (comparePass) {
            delete user.password
            return user
        } else {
            throw new HttpException(ERROR_MESSAGE.INVALID_USERNAME_OR_PASSWORD, HttpStatus.BAD_REQUEST);
        }

    }

    async findUserByMail(email: string) {
        return this.userRepository.findOneBy({email})
    }

}
