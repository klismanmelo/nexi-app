import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "@/src/lib/prisma";

export async function deleteLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).delete('/link/:linkId', {
        schema: {
            tags: ["Links"],
            summary: "Delete User Link",
            params: z.object({
                linkId: z.string().uuid() // se for UUID (recomendado)
            }),
            response: {
                201: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
            throw new BadRequestError("User not found")
        }

        const { linkId } = request.params

        const response = await prisma.link.delete({
            where: {
                id: linkId,
                userId
            }
        })

        if (!response) {
            throw new BadRequestError('Erro delete item')
        }

        return reply.status(201).send({ message: 'Delete sucesffuly' })
    })
}