import { prisma } from "@/src/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { BadRequestError } from "../_errors/bad-request-error";
import { auth } from "../../middleware/auth";

export async function getShare(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get('/share', {
        schema: {
            tags: ["Share"],
            summary: "Create a new Share",
            response: {
                200: z.object({
                    data_share: z.object({
                        share_link: z.number(),
                        share_profile: z.number()
                    })
                })
            }
        }
    }, async (request, reply) => {
        const userId = await request.getCurrentUserId()

        if (!userId) {
            throw new BadRequestError("User not found")
        }
        const share_link = await prisma.share.count({
            where: {
                userId,
                type: 'LINK'
            }
        })

        if (!share_link) {
            throw new BadRequestError("Error to create Share")
        }

        const share_profile = await prisma.share.count({
            where: {
                userId,
                type: 'LINK'
            }
        })

        if (!share_profile) {
            throw new BadRequestError("Error to create Share")
        }

        const data_share = {
            share_link,
            share_profile
        }

        return reply.status(200).send({ data_share })
    })
}