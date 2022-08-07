import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {JwtService} from "@nestjs/jwt";
// const bcrypt = require('bcrypt');
import * as bcrypt from "bcrypt"

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let bcryptService: bcrypt
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn()
                    }
                },
                {
                    provide: bcrypt,
                    useValue: {
                        hash: jest.fn(),
                        compare: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        bcryptService = module.get<bcrypt>(bcrypt)
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('jwtService should be defined', () => {
        expect(jwtService).toBeDefined();
    });

    describe("Jwt services", () => {
        it('should return jwt token', async () => {
            await service.generateJWT({
                    "email": "f.barati@fn.com",
                    "id": 1,
                    "name": "fatemeh",
                    "userName": "fatemehbrt",
                    "password": "123"
                }
            )
            expect(jwtService.signAsync).toHaveBeenCalledWith(
                JSON.stringify({
                    "email": "f.barati@fn.com",
                    "id": 1,
                    "name": "fatemeh",
                    "userName": "fatemehbrt",
                    "password": "123"
                })
            )
            expect(jwtService.signAsync).not.toEqual(null)
            expect(jwtService.signAsync).toReturn()
        });
    })

    describe("bcrypt service", () => {
        it('should return hash password', async () => {
            await service.generatePassword('123')
            expect(bcrypt.hash).not.toEqual(null)
            expect(bcrypt.hash).toBeDefined()
        });

        it('should compare password with hash password', async () => {
            await service.comparePassword('123', 'hash123')
            expect(bcrypt.hash).not.toEqual(null)
            expect(bcrypt.hash).toBeDefined()
        });
    })
});
