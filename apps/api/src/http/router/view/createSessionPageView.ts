import { prisma } from '@/src/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { createHash } from 'node:crypto'

export async function createSessionPageView(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/sessions/page-view',
        {
            schema: {
                tags: ['Analytics'],
                summary: 'Create or reuse session and register page view',
                body: z.object({
                    userId: z.string()
                }),
                response: {
                    201: z.object({
                        sessionId: z.string()
                    })
                }
            }
        },
        async (request, reply) => {
            const { userId } = request.body

            const ip =
                request.headers['x-forwarded-for'] ??
                request.ip

            const userAgent = request.headers['user-agent']
            const referrer = request.headers['referer']

            const ipHash = createHash('sha256')
                .update(String(ip))
                .digest('hex')

            const sessionToken = request.cookies.session_id

            let session = sessionToken
                ? await prisma.session.findUnique({
                    where: { id: sessionToken }
                })
                : null

            // 🆕 cria session se não existir
            if (!session) {
                session = await prisma.session.create({
                    data: {
                        userId,
                        ipHash,
                        browser: userAgent,
                        referrer
                    }
                })

                // 🍪 seta cookie
                reply.setCookie('session_id', session.id, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 24 // 24h
                })
            }

            // 👁️ registra page view
            await prisma.pageView.create({
                data: {
                    userId,
                    sessionId: session.id
                }
            })

            return reply.status(201).send({
                sessionId: session.id
            })
        }
    )
}