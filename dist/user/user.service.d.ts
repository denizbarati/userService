import { UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: UserDto): Promise<{
        message: UserDto & UserEntity;
    }>;
    findAll(): Promise<{
        message: UserEntity[];
    }>;
    findOne(userName: string): Promise<UserDto>;
    update(userName: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(userName: string): Promise<import("typeorm").DeleteResult>;
}
