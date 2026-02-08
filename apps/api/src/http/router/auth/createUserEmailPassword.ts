import { prisma } from "@/src/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod"
import { BadRequestError } from "../_errors/bad-request-error";
import { hash } from "bcryptjs"

export async function createUserEmailPassword(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/user', {
            schema: {
                tags: ["Auth"],
                summary: "Create User with Email and password",
                body: z.object({
                    username: z.string().min(5),
                    email: z.email(),
                    password: z.string().min(6)
                }),
                response: {
                    201: z.object({
                        message: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { username, email, password } = request.body

            const withSameEmail = await prisma.user.findUnique({
                where: { email }
            })

            if (withSameEmail) {
                throw new BadRequestError('User need is unique email')
            }

            const passwordHash = await hash(password, 6)

            await prisma.user.create({
                data: {
                    username,
                    email,
                    passwordHash,
                    biography: ''
                }
            })

            return reply.status(201).send({ message: 'User created successfully' })
        })
}