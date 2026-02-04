import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { prisma } from "@/src/lib/prisma";

export async function createLink(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .post('/link', {
            schema: {
                tags: ["Links"],
                summary: "Create Link User",
                body: z.object({
                    title: z.string(),
                    url: z.string(),
                    icon: z.string().optional(),
                    position: z.number()
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
                throw new BadRequestError("User invalid")
            }

            const { title, url, icon, position } = request.body

            const link = await prisma.link.create({
                data: {
                    title,
                    url,
                    icon,
                    position,
                    userId,
                },
            })

            if (!link) {
                throw new BadRequestError('Error create link')
            }

            return reply.status(201).send({ message: "Link created sucesfuly" })
        })
}