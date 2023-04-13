const { GraphQLList, GraphQLID } = require('graphql');

const { UserType } = require('./types');

const { User } = require('../models');

const users = {
    type: new GraphQLList(UserType),
    description: 'Get all users from the database',
    async resolve(parent, args){
        return await User.find()
    }
}

const user = {
    type: UserType,
    description: 'Query single user by ID',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args){
        console.log(parent, args)
        return User.findById(args.id)
    }
}

module.exports = {
    users,
    user
}