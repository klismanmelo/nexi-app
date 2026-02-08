import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { auth } from '../../middleware/auth'
import { prisma } from '@/src/lib/prisma'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getMe(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get(
            '/me',
            {
                schema: {
                    tags: ['Auth'],
                    summary: 'Get authenticated user profile',
                    response: {
                        200: z.object({
                            user: z.object({
                                id: z.string(),
                                username: z.string(),
                                name: z.string().nullable(),
                                email: z.string().email(),
                                avatarUrl: z.string().nullable(),
                            }),
                        }),
                    },
                },
            },
            async (request, reply) => {
                const userId = await request.getCurrentUserId()

                if (!userId) {
                    throw new BadRequestError('User not authenticated')
                }

                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                })

                if (!user) {
                    throw new BadRequestError('User not found')
                }

                return reply.status(200).send({ user })
            }
        )
}