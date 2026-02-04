import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "@/src/lib/prisma";
export async function listLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get('/links', {
        schema: {
            tags: ["Link"],
            summary: "List User Links",
            response: {
                200: z.array(
                    z.object({
                        title: z.string(),
                        url: z.string(),
                        icon: z.string().nullable(),
                        position: z.number()
                    })
                )
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
            throw new BadRequestError("User not found")
        }

        const listLinks = await prisma.link.findMany({
            where: {
                userId
            },
            orderBy: {
                position: 'asc'
            }
        })

        return reply.status(200).send(listLinks)
    })
}