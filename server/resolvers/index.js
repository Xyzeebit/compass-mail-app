const { Query, Mutation } = require('./resolvers');
const { GraphQLScalarType } = require("graphql");

module.exports = {
  Query,
  Mutation,
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};