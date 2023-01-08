import {Context} from './Context'

export default {
    Query: {
        async getCategories(parent:any, __:any, {Category}:Context){
            return await Category.find({})
        }
    },

    Mutation: {
        async addCategory(_:any, {title, value}:{title: string, value: string}, {Category}:Context){
            const createdCategory = new Category({
                title: title,
                value: value
            })
            createdCategory.save()
        },

        async updateCategory(_:any, {cateId, title, value}:{cateId: string, title: string, value: string}, {Category}:Context){
            await Category.updateOne({_id: cateId}, {title: title, value: value})
        },

        async deleteCategory(_:any, {cateId}:{cateId: string}, {Category}:Context){
            await Category.deleteOne({_id: cateId})
        }
    }
}