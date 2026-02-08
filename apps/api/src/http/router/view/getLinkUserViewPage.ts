import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { prisma } from "@/src/lib/prisma";
import { BadRequestError } from "../_errors/bad-request-error";


export async function getLinkUserViewPage(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/:username',
        {
            schema: {
                tags: ["PageView"],
                summary: "Get info User Profile",
                params: z.object({
                    username: z.string()
                }),
                response: {
                    200: z.object({
                        user: z.object({
                            id: z.uuid(),
                            avatarUrl: z.url().nullable(),
                            username: z.string().nullable(),
                            biography: z.string(),
                            links: z.array(
                                z.object({
                                    title: z.string(),
                                    url: z.string(),
                                    icon: z.string(),
                                    isVisible: z.boolean()
                                })
                            )
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const { username } = request.params


            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    username: true,
                    biography: true,
                    avatarUrl: true,
                },
                where: {
                    username,
                },
            })

            if (!user) {
                throw new BadRequestError('user not found')
            }

            const listLinks = await prisma.link.findMany({
                where: {
                    userId: user.id
                },
                orderBy: {
                    position: 'asc'
                }
            })

            if (!listLinks) {
                throw new BadRequestError('List Link not found.')
            }

            const dataResponse = {
                user: {
                    id: user.id,
                    username: user.username,
                    biography: user.biography,
                    avatarUrl: user.avatarUrl,
                    links: listLinks.map(link => ({
                        title: link.title,
                        url: link.url,
                        icon: link.icon ?? '',
                        isVisible: link.isVisible, // boolean
                    }))
                }
            }

            return reply.status(200).send(dataResponse)
        })
}