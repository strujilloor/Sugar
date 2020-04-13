const BabyResolver = require('./BabyResolvers');
const ParentResolver = require('./ParentResolvers');

const { EmailAddressResolver } = require('graphql-scalars'); // lo importamos

module.exports = {
    EmailAdd: EmailAddressResolver, // y lo agregamos
    Query:{
        ...BabyResolver.Query,
        ...ParentResolver.Query,
    },
    Mutation:{
        ...BabyResolver.Mutation,
        ...ParentResolver.Mutation,
    }
}