import {gql} from 'apollo-server-express'

export default gql`

type Category {
    _id: ID
    title: String
    value: String
}

type Query {
    getCategories: [Category]
}

type Mutation {
    addCategory(title: String, value: String): Category
    updateCategory(cateId: String, title: String, value: String): Category
    deleteCategory(cateId: String): Category
}


`



