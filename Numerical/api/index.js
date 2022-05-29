const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
require('dotenv').config()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const connection = require('./db')

//connection
connection()

const rootofEQ = require('./routes/rootofeq')

//middlewares
app.use(express.json())
app.use(cors())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API Document',
            description: 'Welcome to API Document',
            contact: {
                name: "Dionidas"
            },
            server: [
                {
                    url: "http://localhost:4000"
                }
            ],
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * /api/rootofeq/{Api}/{Params}:
 *  get:
 *    summary: Get Equation
 *    parameters:
 *      - in: path
 *        name: Api
 *        schema: 
 *          type: string
 *        required: true
 *      - in: path
 *        name: Params
 *        schema: 
 *          type: string
 *        required: true
 *    responses: 
 *      200: 
 *        description: Successful
 *      404:
 *        description: Can not Resposes
 */
//routes
app.use('/api/rootofeq', rootofEQ)

app.listen(port, () => console.log(`Running Server on ${port}`))