import { prisma } from '@/src/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createLinkClick(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/links/:linkId/click',
            {
                schema: {
                    tags: ['LinkClick'],
                    params: z.object({
                        linkId: z.uuid(),
                    }),
                    body: z.object({
                        userId: z.uuid(),
                        sessionId: z.uuid(),
                    }),
                },
            },
            async (request, reply) => {
                const { linkId } = request.params
                const { userId, sessionId } = request.body

                const verifySession = await prisma.session.upsert({
                    where: { id: sessionId },
                    update: {},
                    create: {
                        id: sessionId,
                        userId,
                    },
                })

                if (!verifySession) {
                    throw new BadRequestError("Session dont exist")
                }

                const linkClick = await prisma.linkClick.create({
                    data: {
                        linkId,
                        userId,
                        sessionId,
                    },
                })

                return reply.status(201).send({ linkClick })
            }
        )
}