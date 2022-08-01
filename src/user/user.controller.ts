import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateUserDto, UserDto} from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: UserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    findAllUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findOneUser(@Param('id') userName: string) {
        return this.userService.findOneUser(userName);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    removeUser(@Param('id') id: number) {
        return this.userService.removeUser(id);
    }

    @Post('login')
    login(@Body() user: UserDto) {
        return this.userService.login(user)
    }
}
