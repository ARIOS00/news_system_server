import {model, Schema} from 'mongoose'

const regionSchema= new Schema({
    title: String,
    value: String
})

export default model('Region', regionSchema)