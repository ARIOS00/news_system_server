import {Context} from './Context'

export default {
    Query: {
        async getNews(parent:any, __:any, {News}:Context){
            return await News.find({})
        },

        async getAuditNews(parent:any, __:any, {News}:Context){
            return await News.find({auditState: 1})
        },

        async getNewsByAuthorAndSate(parent:any, {input}:any, {News}:Context){
            const res = await News.find({author: input.author, publishState: input.publishState})
            return res
        },

        async newsSunset(_:any, {id}:{id:string}, {News}:Context){
            await News.updateOne({_id: id}, {publishState: 2})
            return await News.findOne({_id: id})
        },
        
        async previewNews(_:any, {newsId}:{newsId:string}, {News}:Context){
            return await News.findOne({_id: newsId})
        },

        async newsList(_:any, {num, sortBy}:{num:number, sortBy:string}, {News}:Context){
            if(sortBy === "view")
                return await News.find({publishState: 2}).sort({view: "desc"}).limit(num)
            else if(sortBy === "star")
                return await News.find({publishState: 2}).sort({star: "desc"}).limit(num)

        },

        async getNewsDraft(_:any, {newsDraftFileter}:any, {News}:Context){
            return await News.find({author: newsDraftFileter.author, auditState: newsDraftFileter.auditState})
        },

        async getNewsById(_:any, {newsId}:{newsId:string}, {News}:Context){
            return await News.findOne({_id: newsId})
        },

        async getAuditNewsList(_:any, {author}:{author: string}, {News}:Context){
            return await News.find({author, auditState: {$ne: 0}, publishState: {$lte: 1}})
        }

    },

    News: {
        async role(parent:any, args:any, {Role}: Context){
            return await Role.findOne({_id: parent.roleId})
        },

        async category(parent:any, args:any, {Category}: Context){
            return await Category.findOne({_id: parent.categoryId})
        },
    },

    Mutation: {
        async newsSunset(_:any, {id}:{id:string}, {News}:Context){
            await News.updateOne({_id: id}, {publishState: 3})
            return await News.findOne({_id: id})
        },

        async newsDelete(_:any, {newsDeleteId}:{newsDeleteId:string}, {News}:Context){
            await News.deleteOne({_id:newsDeleteId})
        },

        async newsPublish(_:any, {newsPublishId}:{newsPublishId:string}, {News}:Context){
            await News.updateOne({_id: newsPublishId}, {publishState: 2, publishTime: Date.now()})
            return await News.findOne({_id: newsPublishId})
        },

        async newsUpload(_:any, {newsId}:{newsId: string}, {News}: Context){
            await News.updateOne({_id: newsId}, {auditState: 1})
            return News.findOne({_id: newsId})
        },

        async newsCreate(_:any, {newsCreateInput}:any, {News}:Context){
            const createdNews = new News({
                ...newsCreateInput
            })

            await createdNews.save()
            return await News.findOne({title: newsCreateInput.title})
        },

        async newsUpdate(_:any, {newsId, newsCreateInput}:any, {News}:Context){
            await News.updateOne({_id: newsId}, {...newsCreateInput})
            return News.findOne({_id: newsId})
        },

        async newsUndo(_:any, {newsId}:{newsId:string},{News}:Context){
            await News.updateOne({_id: newsId}, {auditState: 0})
            return await News.findOne({_id: newsId})
        }
    }

}