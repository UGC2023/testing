const resolvers = {
  Query: {
    myapps: async (_, args, { creatorBinding, brandBinding, userID }, info) => {
      const creator = await creatorBinding.query.profile(
        { userID },
        `{ picture name }`
      )
      const brand = await brandBinding.query.brand(
        { userID },
        `{ picture companyName }`
      )
      return [
        { ...creator, app: 'creator', url: 'https://new.churro.io/creator' },
        {
          picture: brand.picture,
          name: brand.companyName,
          app: 'brand',
          url: 'https://new.churro.io/brand'
        }
      ]
    }
  }
}

module.exports = resolvers
