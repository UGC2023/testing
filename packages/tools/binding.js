const fetch = require('node-fetch')
const { Binding: GraphQLBinding } = require('graphql-binding')
const { HttpLink } = require('apollo-link-http')
const { makeRemoteExecutableSchema } = require('graphql-tools')

class Binding extends GraphQLBinding {
  constructor ({ endpoint, typeDefs }) {
    const link = new HttpLink({ uri: endpoint, fetch })
    const schema = makeRemoteExecutableSchema({ link, schema: typeDefs })

    // Invoke the constructor of `Binding` with the remote schema
    super({
      schema: schema
    })
  }
}

module.exports = Binding
