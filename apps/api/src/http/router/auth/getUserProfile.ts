import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { prisma } from "@/src/lib/prisma";
import { BadRequestError } from "../_errors/bad-request-error";
export async function getUserProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get('/profile',
        {
            schema: {
                tags: ["Auth"],
                summary: "Get info User Profile",
                response: {
                    200: z.object({
                        user: z.object({
                            id: z.uuid(),
                            name: z.string().nullable(),
                            username: z.string().nullable(),
                            biography: z.string(),
                            phoneNumber: z.string().nullable(),
                            email: z.email(),
                            avatarUrl: z.string().url().nullable()
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()


            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    biography: true,
                    phoneNumber: true,
                    email: true,
                    avatarUrl: true,
                },
                where: {
                    id: userId,
                },
            })

            if (!user) {
                throw new BadRequestError('User not found.')
            }

            return reply.send({ user })
        })
}