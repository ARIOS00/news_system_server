import {gql} from 'apollo-server-express'

export default gql`

type Role {
    _id: ID
    roleName: String
    roleType: Int
    rights: Rights
}

type Rights {
    checked: [String]
    halfChecked: [String]
}

input roleInput {
    roleId: String
    rights: rightsInput
}

input rightsInput {
    checked: [String]
    halfChecked: [String]
}


type Query {
    getRoles: [Role]
}

type Mutation {
    updateRoleRights(roleInput:roleInput): Role
    deleteRoleById(roleId: String): Role
}


`



