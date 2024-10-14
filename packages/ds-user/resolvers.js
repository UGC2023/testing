const axios = require('axios')
const qs = require('qs')

const resolvers = {
  Query: {
    getToken: (_, { code }, { req: { req } }) => axios.post(
      `${process.env.AUTH_ENDPOINT}/token`,
      qs.stringify({
        client_id: 'accounts-ui',
        client_secret: 'akVh66H2Xn35QDXs',
        code,
        redirect_uri: req.get('Referrer').split('?')[0],
        grant_type: 'authorization_code',
        nonce: 12,
        state: '321',
        scope: 'openid profile email offline_access',
        token_endpoint_auth_method: 'none'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then(({ data }) => {
      return data
    }).catch(err => {
      throw new Error(err.response.data.error_description)
    })
  },
  Mutation: {
    signup: (_, { name, password, email }, { binding }) => binding.mutation.createUser({
      data: { name, password, email }
    })
  }
}

module.exports = resolvers
