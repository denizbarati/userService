import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: UserDto): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(userName: string): Promise<UserDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Object>;
    remove(id: number): Promise<Object>;
}
