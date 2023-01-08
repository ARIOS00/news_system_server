import {gql} from 'apollo-server-express'

export default gql`

type Right {
    _id: ID
    title: String,
    key: String,
    pagepermission: Boolean,
    grade: Int
    children: [Children]
}

type Query {
    getRights: [Right]
}

type Mutation {
    deleteRight(rightId: String): [Right]
    editableRight(rightId: String, pagepermission: Boolean): Right
}
`



