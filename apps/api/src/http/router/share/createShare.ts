import { prisma } from "@/src/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";

export async function createShare(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/share', {
        schema: {
            tags: ["Share"],
            summary: "Create a new Share",
            body: z.object({
                userId: z.uuid(),
                type: z.enum(['PROFILE', 'LINK'])
            }),
            response: {
                201: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { userId, type } = request.body

        const response = await prisma.share.create({
            data: {
                userId,
                type
            }
        })

        if (!response) {
            throw new BadRequestError("Error to create Share")
        }

        return reply.status(201).send({ message: "create new share" })
    })
}