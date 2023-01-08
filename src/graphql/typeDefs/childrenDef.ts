import {gql} from 'apollo-server-express'

export default gql`

type Children {
    _id: ID
    title: String,
    rightId: String,
    key: String,
    pagepermission: Boolean
    routepermission: Boolean
    grade: Int
    right: Right
}

type Query {
    getChildrens: [Children]
}

type Mutation {
    deleteChildren(childrenId: String): Children
    editableChildren(childrenId: String, pagepermission: Boolean): Children
}

`



