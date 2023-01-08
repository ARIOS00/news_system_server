import {model, Schema} from 'mongoose'

const rightSchema= new Schema({
    title: String,
    key: String,
    pagepermission: Boolean,
    grade: Number
})

export default model('Right', rightSchema)