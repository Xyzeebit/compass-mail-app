const auth = require('../controllers/auth');

const queries = {
    Query: {




    }
}


const mutations = {
    Mutation: {
        async signUp(parent, args) {
            return await auth.signUp(args);
        }
        async signIn(parent, args) {
            return await auth.signIn(args);
        }
    }
}

module.exports = {
    Query: queries.Query,
    Mutations: mutations.Mutation
}