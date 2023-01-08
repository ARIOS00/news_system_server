import {model, Schema} from 'mongoose'

const newsSchema= new Schema({
    title: String,
    categoryId: String,
    content: String,
    region: String,
    author: String,
    roleId: String,
    auditState: Number,
    publishState: Number,
    createTime: Number,
    publishTime: Number,
    star: Number,
    view: Number,
})

export default model('News', newsSchema)