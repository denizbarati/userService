import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UpdateUserDto, UserDto} from './dto/user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth/services/auth.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {
    }


    async create(@Body() createUserDto: UserDto): Promise<UserDto> {
        try {
            console.log("BODY RECEIVED :", createUserDto)
            const hashPassword = await this.authService.generatePassword(createUserDto.password)
            console.log("hashPassword", hashPassword)
            const newUser = new UserEntity()
            newUser.id = createUserDto.id
            newUser.userName = createUserDto.userName
            newUser.name = createUserDto.name
            newUser.email = createUserDto.email
            newUser.password = hashPassword
            const result = await this.userRepository.save(newUser);
            delete result.password
            return result
        } catch (e) {
            console.log("ERR IN CREATE USER: ", e);
            throw e
        }
    }

    async findAll(): Promise<UserDto[]> {
        try {
            const result = await this.userRepository.find();
            result.forEach(item => {
                delete item.password
            })
            return result
        } catch (e) {
            console.log("ERR IN FIND ALL USERS: ", e);
            throw e
        }

    }

    async findOne(userName: string): Promise<UserDto> {
        try {
            const result = await this.userRepository.findOneBy({userName});
            delete result.password
            return result
        } catch (e) {
            console.log("ERR IN FIND ONE USER: ", e);
            throw e
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
        try {
            delete updateUserDto.password,
                delete updateUserDto.email

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

    async login(user: UserDto) {
        try {
            const findUser = await this.validateUser(user.email, user.password)
            const jwt = await this.authService.generateJWT(findUser)
            return {
                message: jwt
            }
        } catch (e) {
            throw e
        }

    }

    async validateUser(email: string, password: string) {
        const user = await this.findUserByMail(email)
        if (!user) {
            throw new HttpException('user not found', HttpStatus.FORBIDDEN);
        }
        const comparePass = await this.authService.comparePassword(password, user.password)
        if (comparePass) {
            delete user.password
            return user
        } else {
            throw new HttpException('invalid email or password', HttpStatus.BAD_REQUEST);
        }

    }

    async findUserByMail(email: string) {
        return this.userRepository.findOneBy({email})
    }

}
