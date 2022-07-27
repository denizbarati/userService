import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import {UpdateUserDto, UserDto} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string) {
    return this.userService.findOne(userName);
  }

  @Patch(':userName')
  update(@Param('userName') userName: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userName, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') userName: string) {
    console.log("111", userName)
    return this.userService.remove(userName);
  }
}
