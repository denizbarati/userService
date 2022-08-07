import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth/services/auth.service";

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>
    let authService: AuthService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOneBy: jest.fn().mockResolvedValue({
                            "id": 1,
                            "name": "fatemeh",
                            "userName": "fatemehbrt",
                            "email": "f.barati@fn.com",
                            "password": "hash123"
                        }),
                        update: jest.fn(),
                        find: jest.fn(),
                        delete: jest.fn(),
                        save: jest.fn()
                    }
                },
                {
                    provide: AuthService,
                    useValue: {
                        generateJWT: jest.fn(),
                        generatePassword: jest.fn(),
                        comparePassword: jest.fn().mockResolvedValue(true)
                    }
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    });

    it('should service be defined', () => {
        expect(service).toBeDefined();
    });
    it('should repository be defined', () => {
        expect(userRepository).toBeDefined()
    });
    it('should authService be defined', () => {
        expect(authService).toBeDefined()
    });

    describe("create new user", () => {
        it('should return encoded password', async () => {
            jest.spyOn(authService, 'generatePassword').mockResolvedValue('hash123')
            await service.createUser({
                id: 1,
                name: "fatemeh",
                userName: "fatemehbrt",
                password: "123",
                email: "f.barati@fn.com"
            })
            expect(authService.generatePassword).toHaveBeenCalledWith('123');
            expect(userRepository.save).toHaveBeenCalledWith({
                id: 1,
                name: "fatemeh",
                userName: "fatemehbrt",
                password: "hash123",
                email: "f.barati@fn.com"
            })
        });
    })

    describe("find all user", () => {
        it('should return all users', async () => {
            await service.findAllUsers()
            expect(userRepository.find).toHaveBeenCalledWith()
            expect(userRepository.find).not.toEqual(null)
            expect(userRepository.find).toReturn()
        });
    })

    describe("find one user", () => {
        it('should return user', async () => {
            await service.findOneUser('fatemeh')
            expect(userRepository.findOneBy).toHaveBeenCalledWith({userName: 'fatemeh'})
            expect(userRepository.findOneBy).not.toEqual(null)
            expect(userRepository.findOneBy).toReturn()
        });
    })

    describe('update user', () => {
        it('should update user', async () => {
            await service.updateUser(1, {
                "name": "fatemeh",
                "password": "123",
                "email": "f.barati@fn.com"
            })
            expect(userRepository.update).toHaveBeenCalledWith(1, {"name": "fatemeh"})
            expect(userRepository.update).not.toEqual(null)
            expect(userRepository.update).toReturn()
        });
    })

    describe('delete user', () => {
        it('should delete user', async () => {
            await service.removeUser(1)
            expect(userRepository.delete).toHaveBeenCalledWith(1)
            expect(userRepository.delete).not.toEqual(null)
            expect(userRepository.delete).toReturn()
        });
    })

    describe("login user", () => {
        it('should return login user', async () => {
            jest.spyOn(authService, 'generateJWT').mockResolvedValue('eyww')
            const userInfo = {
                "name": "fatemeh",
                "userName": "fatemehbrt",
                "password": "123",
                "email": "f.barati@fn.com"
            }
            await service.login(userInfo)
            expect(userRepository.findOneBy).toHaveBeenCalledWith({email: 'f.barati@fn.com'})
            expect(authService.comparePassword).toHaveBeenCalledWith("123", "hash123")
            expect(authService.generateJWT).toHaveBeenCalledWith(
                {"email": "f.barati@fn.com", "id": 1, "name": "fatemeh", "userName": "fatemehbrt"}
            )
        });
    })
});
