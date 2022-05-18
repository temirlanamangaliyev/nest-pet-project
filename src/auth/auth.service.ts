import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { AuthDto } from "src/dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async singup(dto: AuthDto) {
        try {
            const hashedPassword = await argon.hash(dto.password)
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hashedPassword
                }
            })
            delete newUser.hash
            return newUser

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code = 'P2002') {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw new error
        }
    }

    async login(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) throw new ForbiddenException('Credentials incorrecnt')

        const pwCompere = await argon.verify(user.hash, dto.password)

        if (!pwCompere) throw new ForbiddenException('Credentials incorrecnt')

        delete user.hash
        return user
    }

}