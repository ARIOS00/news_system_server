import {gql} from 'apollo-server-express'

export default gql`

type Region {
    _id: ID
    title: String
    value: String
}

type Query {
    getRegions: [Region]
}

`



