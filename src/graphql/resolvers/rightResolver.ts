import {Context} from './Context'

export default {
    Query: {
        async getRights(_:any, __:any, {Right}:Context){
            return await Right.find({})
        }
    },

    Right: {
        async children(parent:any, args:any, {Children}: Context){
            return await Children.find({rightId: parent._id})
        }
    },

    Mutation: {
        async deleteRight(_:any, {rightId}: {rightId: string}, {Right}:Context){
            await Right.deleteOne({_id: rightId})
        },

        async editableRight(_:any, {rightId, pagepermission}: {rightId: string, pagepermission: boolean}, {Right}:Context){
            await Right.updateOne({_id: rightId}, {pagepermission: pagepermission})
            return Right.findOne({_id: rightId})
        }
    }
}