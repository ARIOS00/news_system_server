import {Context} from './Context'

export default {
    Query: {
        async getRoles(_:any, __:any, {Role}:Context) {
            const res = await Role.find({})
            return res
        }
    },

    Mutation: {
        async updateRoleRights(_:any, {roleInput}:any, {Role}:Context){
            await Role.updateOne({_id: roleInput.roleId}, {rights: roleInput.rights})
            return await Role.findOne({_id: roleInput.roleId})
        },

        async deleteRoleById(_:any, {roleId}:{roleId: string}, {Role}:Context){
            await Role.deleteOne({_id: roleId})
        }
    }
}