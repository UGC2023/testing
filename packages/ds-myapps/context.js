const fetch = require('node-fetch')
const { HttpLink } = require('apollo-link-http')
const { introspectSchema } = require('graphql-tools')
const { Binding } = require('@churro/graphql-binding')

const creatorLink = new HttpLink({
  uri: process.env.CREATOR_SVC,
  fetch
})
const brandLink = new HttpLink({
  uri: process.env.BRAND_SVC,
  fetch
})
let creatorBinding = {}
let brandBinding = {}

introspectSchema(creatorLink)
  .then(typeDefs => {
    creatorBinding = new Binding({
      endpoint: process.env.CREATOR_SVC,
      typeDefs
    })
    console.log('Fetched creator service schema')
  })
  .catch(err => console.error(err))

introspectSchema(brandLink)
  .then(typeDefs => {
    brandBinding = new Binding({
      endpoint: process.env.BRAND_SVC,
      typeDefs
    })
    console.log('Fetched brand service schema')
  })
  .catch(err => console.error(err))

module.exports = context => {
  if (
    context.connection &&
    context.connection.context &&
    context.connection.context.userid
  ) {
    return { creatorBinding, brandBinding, userID: context.connection.context.userid }
  } else if (context.req && context.req.headers && context.req.headers.userid) {
    return { creatorBinding, brandBinding, userID: context.req.headers.userid }
  } else return { creatorBinding, brandBinding }
}
