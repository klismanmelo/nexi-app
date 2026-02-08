import { fastify } from "fastify"
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySaggerUI from '@fastify/swagger-ui'
import cors from '@fastify/cors'

import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from 'fastify-type-provider-zod'
import { createUserEmailPassword } from "./router/auth/createUserEmailPassword"
import { authUserPassword } from "./router/auth/authUserPassword"
import { getUserProfile } from "./router/auth/getUserProfile"
import { createLink } from "./router/links/createLink"
import { listLink } from "./router/links/listLink"
import { deleteLink } from "./router/links/deleteLink"
import { patchLinkVisible } from "./router/links/patchLinkVisible"
import { getLinkUserViewPage } from "./router/view/getLinkUserViewPage"
import { updateUserPRofile } from "./router/auth/updateUserProfile"
import { createSessionPageView } from "./router/view/createSessionPageView"
import cookie from '@fastify/cookie'
import { getDataAnalytics } from "./router/view/getDataAnalytics"
import { getMe } from "./router/view/getSameUserPageView"

const server = fastify()

server.withTypeProvider<ZodTypeProvider>()
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(cors, {
    origin: [
        'http://localhost:3000',
        'https://nexi.arquitetor.space',
    ],
    credentials: true,
})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Nexi Project API',
            version: '1.0.0',
        },
        servers: []
    },
    transform: jsonSchemaTransform,
})

server.register(fastifySaggerUI, {
    routePrefix: '/docs'
})

server.register(fastifyJwt, {
    secret: 'super-secret-key',
})

server.register(cookie, {
    secret: process.env.COOKIE_SECRET, // opcional
    hook: 'onRequest'
})

server.register(createUserEmailPassword)
server.register(authUserPassword)
server.register(getUserProfile)
server.register(updateUserPRofile)

server.register(createLink)
server.register(listLink)
server.register(deleteLink)
server.register(patchLinkVisible)

server.register(getLinkUserViewPage)
server.register(createSessionPageView)
server.register(getDataAnalytics)
server.register(getMe)

server.listen({ port: 3332 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`🚀 Server listening at ${address}`)
})