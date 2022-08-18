const auth = require('../controllers/auth');
const user = require('../controllers/user');
const { GraphQLScalarType } = require("graphql");


const queries = {
    Query: {
        async user(parent, args) {
            const payload = await user.getUser(args);
            return payload;
        },
        async inbox(parent, args) {
            const payload = await user.inbox(args);
            return payload;
        },
        async outbox(parent, args) {
            const payload = await user.outbox(args);
            return payload;
        },
        async drafts(parent, args) {
            const payload = await user.drafts(args);
            return payload;
        },
        async spam(parent, args) {
            const payload = await user.spam(args);
            return payload;
        },
        async trash(parent, args) {
            const payload = await user.trash(args);
            return payload;
        }

    }
}


const mutations = {
    Mutation: {
        async signUp(parent, args) {
            
            const payload = await auth.signUp(args);
            return payload;
        },
        async signIn(parent, args) {
            const payload = await auth.signIn(args);
            return payload;
        },
        async markAs(parent, args) {
            const payload = { success: false };
            return payload;
        },
        async sendMessage(parent, args) {
            const payload = await user.sendMessage(args.message);
            return payload;
        }

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