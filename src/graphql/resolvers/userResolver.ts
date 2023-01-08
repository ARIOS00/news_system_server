import {Args, Context} from './Context'
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const JWT_SIGNATURE = "asfavsd"

export default {
    Query: {
        async login(_:any, {userInput: {username, password}}:Args, {User,userInfo}:Context) {
            // console.log(userInfo)
            const res = await User.findOne({username: username})
            if(!res)
                return {
                    status: 'FAILED',
                    res: null,
                    msg: "username does not exist!"
                }
            
            if(!await bcrypt.compare(password, res.password!))
                return {
                    status: 'FAILED',
                    res: null,
                    msg: "password is incorrect!"
                }

            const token:String = await JWT.sign({
                userId: res._id
            }, JWT_SIGNATURE, {
                expiresIn: 36000
            })

            return {
                status: 'SUCCESS',
                res: res,
                msg: token
            }
        },

        async getUsers (_:any, __:any, {User}:Context){
            return await User.find({})
        }
    },

    User: {
        async role({roleId}:{roleId:String}, args:any, {Role}:Context){
            const res = await Role.findOne({_id: roleId})
            return res
        }
    },

    Mutation: {
        async signUp(_:any, {userInput: {username, password}}:Args, {User}:Context){
            const preQueryRes = await User.findOne({username: username})
            if(preQueryRes)
                return {
                    status: 'FAILED',
                    res: null,
                    msg: "username already exists!"
                }

            const createdUser = new User({
                username: username,
                password: await bcrypt.hash(password, 10),
                roleState: true,
                default: false,
                region: "Asia",
                roleId: null
            })

            await createdUser.save()
            const qres = await User.findOne({username: username})
            if(!qres)
                return {
                    status: 'FAILED',
                    res: null,
                    msg: 'something went wrong!'
                }

            const token:String = await JWT.sign({
                userId: qres._id
            }, JWT_SIGNATURE, {
                expiresIn: 36000
            })

            return{
                status: 'SUCCESS',
                res: qres,
                msg: token,
            }
        },

        async userTest(_:any, {id}:any){
            console.log("usertest", id)
        },

        async deleteUser(_:any, {deleteId}:{deleteId: string}, {User}:Context){
            await User.deleteOne({_id: deleteId})
        },

        async postUser(_:any, {newUserInput}:any, {User}:Context){
            const tmp = new User({
                ...newUserInput,
                roleState: true,
                default: false
            })
            await tmp.save()
            return await User.findOne({username: newUserInput.username})
        },

        async updateUser(_:any, {newUserInput}:any, {User}:Context){
            await User.updateOne({_id: newUserInput.newUserId}, {
                username: newUserInput.username,
                password: newUserInput.password,
                region: newUserInput.region,
                roleId: newUserInput.roleId,
                roleState: newUserInput.roleState
            })

            return await User.findOne({_id: newUserInput.newUserId})
        }
    }
}