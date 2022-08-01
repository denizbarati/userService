export class UserDto {
    id?: number;
    name: string;
    userName: string;
    password: string;
    email: string;
}

export class UpdateUserDto {
    name: string;
    email: string;
    password: string;
}

