import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("/user/:id (GET)", () => {
        it('/user/:rightId (GET)', () => {
            return request(app.getHttpServer())
                .get('/user/fatemehbrt1')
                .expect(200)
                .expect({
                    "id": 3,
                    "name": "fatemeh",
                    "userName": "fatemehbrt1",
                    "email": "f.barati@fn.com"
                });
        });
        it('/user/:badId (GET)', () => {
            return request(app.getHttpServer())
                .get('/user/fat1')
                .expect(400)
                .expect({
                    "statusCode": 400,
                    "message": "user not found"
                });
        });
    })

    describe("/user (POST)", () => {
        // it('should create user', async () => {
        //     return request(app.getHttpServer())
        //         .post('/user')
        //         .send({
        //             "name": "fatemeh",
        //             "userName": "fatemehbrrt",
        //             "password": "123",
        //             "email": "f.barati@fn.com"
        //         })
        //         .expect(201)
        //         .expect({
        //             "id": 9,
        //             "userName": "fatemehbrrt",
        //             "name": "fatemeh",
        //             "email": "f.barati@fn.com"
        //         })
        // });

        it('should not create user', async () => {
            return request(app.getHttpServer())
                .post('/user')
                .send({
                    "name": "fatemeh",
                    "userName": "fatemehbrrt",
                    "password": "123",
                    "email": "f.barati@fn.com"
                })
                .expect(400)
                .expect({
                    "statusCode": 400,
                    "message": "user exist enter another userName"
                })
        });
    })

    describe("/user (GET)", () => {
        it('should return find all users', async () => {
            return request(app.getHttpServer())
                .get('/user')
                .expect(200)
                .expect([
                    {
                        "id": 3,
                        "name": "fatemeh",
                        "userName": "fatemehbrt1",
                        "email": "f.barati@fn.com"
                    },
                    {
                        "id": 6,
                        "name": "fatemeh",
                        "userName": "fatemehbr",
                        "email": "f.barati@fn.com"
                    },
                    {
                        "id": 7,
                        "name": "fatemeh",
                        "userName": "fatemehbrr",
                        "email": "f.barati@fn.com"
                    },
                    {
                        "id": 9,
                        "name": "fatemeh",
                        "userName": "fatemehbrrt",
                        "email": "f.barati@fn.com"
                    }
                ])
        });
    })

    describe("/user (PATCH)", () => {
        it('should update user right ID', async () => {
            return request(app.getHttpServer())
                .patch('/user/1')
                .send({
                    "name": "fatemeh",
                    "userName": "fatemehbrt",
                    "email": "f.barati@fn.com"
                })
                .expect(200)
                .expect({
                    "message": "Successfully updated"
                })
        });
    })

    describe("/user (DELETE)", () => {
        it('should delete user right ID', async () => {
            return request(app.getHttpServer())
                .delete('/user/1')
                .expect(200)
                .expect({
                    "message": "Successfully deleted"
                })
        });
    })

    describe("/user/login (POST)", () => {
        it('should login user', async () => {
            return request(app.getHttpServer())
                .post('/user/login')
                .send({
                    "name": "fatemeh",
                    "userName": "fatemehbrt",
                    "password": "123",
                    "email": "f.barati@fn.com"
                })
                .expect(201)
                .expect({
                    "message": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6ImZhdGVtZWgiLCJ1c2VyTmFtZSI6ImZhdGVtZWhicnQxIiwiZW1haWwiOiJmLmJhcmF0aUBmbi5jb20ifQ.EkTIesVXMs_fPbV6HjjGiwWJoyGrkXaHlrzeUQ_9xx8"
                })
        });
    })
});
