import {model, Schema} from 'mongoose'

const roleSchema= new Schema({
    roleName: String,
    roleType: Number,
    rights: {
        checked: [String],
        halfChecked: [String]
    }
})

export default model('Role', roleSchema)