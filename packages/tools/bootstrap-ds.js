const gramps = require('@gramps/gramps').default
const { ApolloServer } = require('apollo-server')

const bootstrap = (ds) => {
  const GraphQLOptions = gramps({ dataSources: [ ds ], extraContext: req => ({ req }) })
  const server = new ApolloServer(GraphQLOptions)
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

module.exports = bootstrap
