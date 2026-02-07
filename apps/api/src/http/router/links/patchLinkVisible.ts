import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "@/src/lib/prisma";

export async function patchLinkVisible(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).patch('/link/:linkId', {
        schema: {
            tags: ["Links"],
            summary: "Uptade props isVisible User Link",
            params: z.object({
                linkId: z.uuid()
            }),
            body: z.object({
                isVisible: z.boolean()
            }),
            response: {
                201: z.object({
                    message: z.string()
                }),
                404: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
            throw new BadRequestError('User not Found')
        }

        const { linkId } = request.params
        const { isVisible } = request.body

        const response = await prisma.link.update({
            where: {
                id: linkId,
                userId
            },
            data: {
                isVisible
            }
        })

        if (!response) {
            throw new BadRequestError('Erro delete item')
        }
    })
}