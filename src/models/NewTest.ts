import {model, Schema} from 'mongoose'

const roleSchema= new Schema({
    t: String
})

export default model('NewTest', roleSchema)