import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserDto} from "./dto/user.dto";


describe('UserController', () => {
    let controller: UserController;
    let userService_mock: {
        createUser: jest.Mock;
        findAllUsers: jest.Mock;
        findOneUser: jest.Mock;
        updateUser: jest.Mock;
        removeUser: jest.Mock;
        login: jest.Mock;
    };
    let service: UserService;
    beforeEach(async () => {
        userService_mock = {
            findOneUser: jest.fn().mockResolvedValue({
                "id": 11,
                "name": "fatemeh",
                "userName": "fatemeh91",
                "email": "f.barati@fn.com"
            }),
            createUser: jest.fn(),
            findAllUsers: jest.fn().mockResolvedValue([
                {
                    "id": 4,
                    "name": "fatemeh",
                    "userName": "fatemeh1",
                    "email": "f.barati@fn.com"
                },
                {
                    "id": 5,
                    "name": "fatemeh",
                    "userName": "fatemeh7",
                    "email": "f.barati@fn.com"
                }
            ]),
            updateUser: jest.fn().mockResolvedValue({
                "message": "Successfully updated"
            }),
            removeUser: jest.fn().mockResolvedValue({
                "message": "Successfully deleted"
            }),
            login: jest.fn().mockResolvedValue({
                "message": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwibmFtZSI6ImZhdGVtZWgiLCJ1c2VyTmFtZSI6ImZhdGVtZWgxIiwiZW1haWwiOiJmLmJhcmF0aUBmbi5jb20ifQ.tHNTIArDD73aVH2rU1BSF1kAXmIkPPy_2b3cJSfbr1U"
            })
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: userService_mock
                }
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe("crete user", () => {
        it('should return create user response', async () => {
            const creteUsers: UserDto = {
                id: 1,
                name: "fatemeh",
                userName: "fatemehbrt",
                password: "123",
                email: "f.barati@fn.com"
            }
            userService_mock.createUser.mockResolvedValue(creteUsers)
            await expect(controller.createUser(creteUsers)).resolves.toEqual(
                creteUsers
            )
        })
    })

    describe("find all users", () => {
        it('should return all users', async () => {
            await expect(controller.findAllUsers()).resolves.toEqual(
                [
                    {
                        "id": 4,
                        "name": "fatemeh",
                        "userName": "fatemeh1",
                        "email": "f.barati@fn.com"
                    },
                    {
                        "id": 5,
                        "name": "fatemeh",
                        "userName": "fatemeh7",
                        "email": "f.barati@fn.com"
                    }
                ]
            )
        });
    })

    describe("find onw user by userName", () => {
        it('should return user', async () => {
            const userName = "fatemeh1"
            await expect(controller.findOneUser(userName)).resolves.toEqual({
                "id": 11,
                "name": "fatemeh",
                "userName": "fatemeh91",
                "email": "f.barati@fn.com"

            })
        });
    })

    describe("update user", () => {
        it('should return updated user', async () => {
            const userData: UserDto = {
                "id": 1,
                "name": "fatemeh",
                "userName": "fatemeh9",
                "password": "123",
                "email": "f.barati@fn.com"
            }
            await expect(controller.updateUser(1, userData)).resolves.toEqual({
                "message": "Successfully updated"
            })
        });
    })

    describe("delete user", () => {
        it('should remove user', async () => {
            await expect(controller.removeUser(1)).resolves.toEqual({
                "message": "Successfully deleted"
            })
        });
    })

    describe("login user", () => {
        it('should user login', async () => {
            const loginData: UserDto = {
                "name": "fatemeh",
                "userName": "fatemehbrt",
                "password": "123",
                "email": "f.barati@fn.com"
            }
            await expect(controller.login(loginData)).resolves.toEqual({
                "message": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwibmFtZSI6ImZhdGVtZWgiLCJ1c2VyTmFtZSI6ImZhdGVtZWgxIiwiZW1haWwiOiJmLmJhcmF0aUBmbi5jb20ifQ.tHNTIArDD73aVH2rU1BSF1kAXmIkPPy_2b3cJSfbr1U"
            })
        });
    })

});
