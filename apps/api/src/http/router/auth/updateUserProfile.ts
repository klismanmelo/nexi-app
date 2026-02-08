import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "@/src/lib/prisma";

export async function updateUserPRofile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).patch('/profile', {
        schema: {
            tags: ["User"],
            summary: "Updaet Info Profile User",
            body: z.object({
                name: z.string().optional(),
                phoneNumber: z.string().optional(),
                biography: z.string().optional()
            }),
            response: {
                202: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
            throw new BadRequestError('User not Found')
        }

        const { name, phoneNumber, biography } = request.body

        const response = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                phoneNumber,
                biography
            }
        })

        if (!response) {
            throw new BadRequestError('Erro delete item')
        }

        return reply.status(202).send({ message: 'User update sucesfully' })
    })
}