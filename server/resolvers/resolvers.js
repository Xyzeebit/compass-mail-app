const auth = require('../controllers/auth');
const { GraphQLScalarType } = require("graphql");


const queries = {
    Query: {
        username(parent, args) {
            return 'donald'
        }


    }
}


const mutations = {
    Mutation: {
        async signUp(parent, args) {
            return await auth.signUp(args);
        },
        async signIn(parent, args) {
            const payload = {};
            const response = await auth.signIn(args);
            return { success: true }
        },

        // DateTime: new GraphQLScalarType({
        //     name: 'DateTime',
        //     description: 'A valid date time value.',
        //     parseValue: value => new Date(value),
        //     serialize: value => new Date(value).toISOString(),
        //     parseLiteral: ast => ast.value
        // }),
    }
};

module.exports = {
    Query: queries.Query,
    Mutation: mutations.Mutation
}