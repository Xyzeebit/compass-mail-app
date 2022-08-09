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
            
            const payload = {};
            const response = await auth.signUp(args);
            return response;
        },
        async signIn(parent, args) {
            const payload = {};
            const response = await auth.signIn(args);
            if (response.error) {
                payload.error = response.error;
                payload.success = response.success;
            } else {
                payload.token = token;
                payload.success = response.success;
                payload.user = {
                    id: response.id,
                    username: response.username
                }
            }
            return payload;
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