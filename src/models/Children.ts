import {model, Schema} from 'mongoose'

const childrenSchema= new Schema({
    title: String,
    rightId: String,
    key: String,
    pagepermission: Boolean,
    routepermission: Boolean,
    grade: Number
})

export default model('Children', childrenSchema)