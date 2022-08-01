import {Injectable} from '@nestjs/common';
import {UserDto} from "../../user/dto/user.dto";
import {JwtService} from "@nestjs/jwt";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async generateJWT(user: UserDto): Promise<string> {
        return await this.jwtService.signAsync(JSON.stringify(user))
    }

    async generatePassword(password: string) {
        return await bcrypt.hash(password, 12)
    }

    async comparePassword(newPassword: string, hashPassword: string) {
        return await bcrypt.compare(newPassword, hashPassword)
    }
}
