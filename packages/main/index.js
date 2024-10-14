const { createServer } = require('http')
const Express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const gramps = require('@gramps/gramps').default
const dsUser = require('@api/ds-user')
const dsMyapps = require('@api/ds-myapps')
const cors = require('cors')

const app = Express()
app.get('/healthz', (req, res) => {
  res.sendStatus(200)
})

const whitelist = [
  'https://localhost:3001',
  'http://localhost:4000'
]
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin)
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true)
      } else if (origin && origin.includes('churro.io')) {
        callback(null, true)
      } else if (origin && origin.includes('taqo.io')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)

app.use(bodyParser.json())
const GraphQLOptions = gramps({ dataSources: [ dsUser, dsMyapps ], extraContext: req => ({ req }) })
const server = new ApolloServer({
  ...GraphQLOptions,
  playground: process.env.NODE_ENV !== 'production'
})
server.applyMiddleware({ app })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
