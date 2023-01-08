import {gql} from 'apollo-server-express'

export default gql`

type User {
    _id: ID
    username: String
    password: String
    roleState: Boolean
    default: Boolean
    region: String
    roleId: String
    role: Role
}

input UserInput {
    username: String
    password: String
}

input newUserInput {
    newUserId: String
    username: String
    password: String
    region: String
    roleId: String
    roleState: Boolean
}

type UserPayload {
    status: Status
    res: User
    msg: String
}

enum Status {
    SUCCESS
    FAILED
}

type Query {
    login(userInput: UserInput): UserPayload!
    getUsers: [User]
}

type Mutation {
    signUp(userInput: UserInput): UserPayload!
    userTest(id: String): String
    deleteUser(deleteId: String): User
    postUser(newUserInput: newUserInput): User
    updateUser(newUserInput: newUserInput): User
}
`



