import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../../middleware/auth";
import z from 'zod'
import { prisma } from "@/src/lib/prisma";
import { UnauthorizedError } from "../_errors/unauthorized-error";

export async function getDataAnalytics(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .get('/analytics-data', {
            schema: {
                tags: ["AnalyticsView"],
                summary: "Get datas Analytics",
                response: {
                    200: z.object({
                        dataAnalytics: z.object({
                            total_views: z.number(),
                            total_visitors: z.number(),
                            total_clicks: z.number(),
                            ctr: z.number(),
                        })

                    })
                }
            }
        }, async (request, reply) => {
            const userId = await request.getCurrentUserId()

            if (!userId) {
                throw new UnauthorizedError("User not found")
            }

            const [
                total_visitors,
                total_views,
                total_clicks
            ] = await Promise.all([
                prisma.session.count({ where: { userId } }),
                prisma.pageView.count({ where: { userId } }),
                prisma.linkClick.count({ where: { userId } }),
            ])

            const ctr = total_views > 0
                ? Number(((total_clicks / total_views) * 100).toFixed(2))
                : 0

            const dataAnalytics = {
                total_visitors,
                total_views,
                total_clicks,
                ctr
            }

            return reply.status(200).send({ dataAnalytics })

        })
}