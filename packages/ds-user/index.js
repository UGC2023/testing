const path = require('path')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const context = require('./context')

const typeDefs = importSchema(path.resolve(__dirname, 'schema.graphql'))

module.exports = {
  namespace: '@api/ds-user',
  typeDefs,
  resolvers,
  context
}
