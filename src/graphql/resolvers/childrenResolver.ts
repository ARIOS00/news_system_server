import {Context} from './Context'
import { rightLoader } from '../../loaders/userLoader'
import Children from '../../models/Children'

export default {
    Query: {
        async getChildrens(parent:any, __:any, {Children}:Context){
            return await Children.find({})
        }
    },

    Children: {
        async right(parent:any, args:any, {Right}: Context){
            if(true)
                return rightLoader.load(parent.rightId)
            else
                return await Right.find({_id: parent.rightId})
        }
    },

    Mutation: {
        async deleteChildren(_:any, {childrenId}:{childrenId:string}, {Children}:Context){
            await Children.deleteOne({_id: childrenId})
        },

        async editableChildren(_:any, {childrenId, pagepermission}:{childrenId:string, pagepermission: Boolean}, {Children}:Context){
            await Children.updateOne({_id: childrenId}, {pagepermission: pagepermission})
            return await Children.findOne({_id: childrenId})
        }
    }

}