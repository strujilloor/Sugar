const BabyResolver = require('./BabyResolvers');
const ParentResolver = require('./ParentResolvers');

module.exports = {
    Query:{
        ...BabyResolver.Query,
        ...ParentResolver.Query,
    },
    Mutation:{
        ...BabyResolver.Mutation,
        ...ParentResolver.Mutation,
    }
}