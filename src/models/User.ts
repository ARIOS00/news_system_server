import {model, Schema, Model} from 'mongoose'

const userSchema= new Schema({
    username: String,
    password: String,
    roleState: Boolean,
    default: Boolean,
    region: String,
    roleId: String
})

export default model('User', userSchema)