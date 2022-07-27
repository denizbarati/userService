import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: UserDto): Promise<{
        message: UserDto & import("./entities/user.entity").UserEntity;
    }>;
    findAll(): Promise<{
        message: import("./entities/user.entity").UserEntity[];
    }>;
    findOne(userName: string): Promise<UserDto>;
    update(userName: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(userName: string): Promise<import("typeorm").DeleteResult>;
}
