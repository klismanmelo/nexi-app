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

server.listen({ port: 3332 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`🚀 Server listening at ${address}`)
})