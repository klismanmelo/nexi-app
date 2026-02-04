import { fastify } from "fastify"
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySaggerUI from '@fastify/swagger-ui'

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

const server = fastify()

server.withTypeProvider<ZodTypeProvider>()
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

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

server.register(createUserEmailPassword)
server.register(authUserPassword)
server.register(getUserProfile)
server.register(createLink)
server.register(listLink)

server.listen({ port: 3332 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`🚀 Server listening at ${address}`)
})