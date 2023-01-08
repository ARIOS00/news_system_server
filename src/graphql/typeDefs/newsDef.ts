import {gql} from 'apollo-server-express'
const BigInt = require('graphql-bigint')

export default gql`

type News {
    _id: ID
    title: String,
    categoryId: String,
    content: String,
    region: String,
    author: String,
    roleId: String,
    auditState: Int,
    publishState: Int,
    createTime: Float,
    publishTime: Float,
    star: Int,
    view: Int,
    role: Role,
    category: Category
}

input newsFilter {
    author: String
    publishState: Int
}

input newsDraftFileter {
    author: String
    auditState: Int
}

input newsCreateInput {
    title: String,
    categoryId: String,
    content: String,
    region: String,
    author: String,
    roleId: String,
    auditState: Int,
    publishState: Int,
    createTime: Float,
    publishTime: Float,
    star: Int,
    view: Int,
}

type Query {
    getNews: [News]
    getNewsById(newsId: String): News
    getNewsByAuthorAndSate(input: newsFilter): [News]
    newsSunset(id: ID): News
    previewNews(newsId: String): News
    newsList(num: Int, sortBy: String): [News]
    getNewsDraft(newsDraftFileter: newsDraftFileter): [News]
    getAuditNews: [News]
    getAuditNewsList(author: String): [News]
}

type Mutation {
    newsSunset(id: ID): News
    newsPublish(newsPublishId: String): News
    newsDelete(newsDeleteId: String): News
    newsCreate(newsCreateInput: newsCreateInput): News
    newsUpload(newsId: String): News
    newsUpdate(newsId: String, newsCreateInput: newsCreateInput): News
    newsUndo(newsId: String): News
}
`