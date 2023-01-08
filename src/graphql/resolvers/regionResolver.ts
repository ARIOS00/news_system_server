import {Context} from './Context'

export default {
    Query: {
        async getRegions(_:any, __:any, {Region}:Context){
            return await Region.find({})
        }
    }
}