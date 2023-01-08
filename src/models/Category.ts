import {model, Schema} from 'mongoose'

const categorySchema= new Schema({
    title: String,
    value: String
})

export default model('Category', categorySchema)