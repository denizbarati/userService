import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    userName: string

    @Column()
    password: string

    @Column()
    email: string

    @BeforeInsert()
    emailToLowerCase() {
        this.email
    }
}