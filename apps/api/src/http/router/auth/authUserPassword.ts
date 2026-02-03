import { prisma } from "@/src/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { compare } from "bcryptjs";

export async function authUserPassword(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/session/password', {
            schema: {
                tags: ["Auth"],
                summary: "Login User with Email and Password",
                body: z.object({
                    email: z.email(),
                    password: z.string().min(6)
                })
            }
        }, async (request, reply) => {
            const { email, password } = request.body

            const finduserEmail = await prisma.user.findFirst({
                where: { email }
            })

            if (!finduserEmail) {
                throw new BadRequestError('Invalid credentials')
            }

            if (finduserEmail.passwordHash === null) {
                throw new BadRequestError('Try login with Social Login')
            }

            const isCorrectPassword = await compare(password, finduserEmail.passwordHash)

            if (!isCorrectPassword) {
                throw new BadRequestError('Invalid credentials')
            }

            const token = await reply.jwtSign(
                {
                    sub: finduserEmail.id
                },
                {
                    sign: {
                        expiresIn: '7 day'
                    }
                })

            return reply.status(201).send({ message: 'Authentication successful', token })
        })
}