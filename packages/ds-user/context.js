const { Binding } = require('@api/tools')
const { schema } = require('@churro/users-service')

const binding = new Binding({
  endpoint: process.env.USERS_SVC,
  typeDefs: schema
})

module.exports = { binding }
