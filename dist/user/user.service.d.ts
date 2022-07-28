import { UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: UserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(userName: string): Promise<UserDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Object>;
    remove(id: number): Promise<Object>;
}
