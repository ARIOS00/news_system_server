
// const {ApolloServer} = require('apollo-server')
import express from 'express'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'

import mongoose from 'mongoose'
const MONGODB = "mongodb+srv://Arios:Xhl7205019@cluster0.5rfisjy.mongodb.net/?retryWrites=true&w=majority"
import { mergeTypeDefs } from 'graphql-tools-merge-typedefs'
import GMR from 'graphql-merge-resolvers'

import userDef from './graphql/typeDefs/userDef'
import roleDef from './graphql/typeDefs/roleDef'
import rightDef from './graphql/typeDefs/rightDef'
import childrenDef from './graphql/typeDefs/childrenDef'
import categoryDef from './graphql/typeDefs/categoryDef'
import newsDef from './graphql/typeDefs/newsDef'
import regionDef from './graphql/typeDefs/regionDef'

import userResolver from './graphql/resolvers/userResolver'
import roleResolver from './graphql/resolvers/roleResolver'
import rightResolver from './graphql/resolvers/rightResolver'
import childrenResolver from './graphql/resolvers/childrenResolver'
import categoryResolver from './graphql/resolvers/categoryResolver'
import newsResolver from './graphql/resolvers/newsResolver'
import regionResolver from './graphql/resolvers/regionResolver'

import User from './models/User'
import Role from './models/Role'
import Right from './models/Right'
import Children from './models/Children'
import Category from './models/Category'
import News from './models/News'
import Region from './models/Region'

import { getUserFromToken } from './util/getUserFromToken'

async function startApolloServer(){

    //initial paramters
    const resolvers = GMR.merge([
        userResolver,
        roleResolver,
        rightResolver,
        childrenResolver,
        categoryResolver,
        newsResolver,
        regionResolver
    ]) as any
    
    const typeDefs = mergeTypeDefs([
        userDef, 
        roleDef,
        rightDef,
        childrenDef,
        categoryDef,
        newsDef,
        regionDef
    ]) 
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req}: any) => {
            const userInfo = await getUserFromToken(req.headers.authorization)
            return {
                User,
                Role,
                Right,
                Children,
                Category,
                News,
                Region,
                userInfo
            }     
        }
    })


    //express global middleware 
    // const mw = (req, res, next)=>{
    //     next()
    // }
    
    const app = express()

    // app.use('/graphql',mw)

    // Apollo 
    const _dirname = path.dirname("")
    const buildPath = path.join(_dirname, "../news_system_client/build")

    app.use(express.static(buildPath))
    await app.get("/*", function(req, res){
        res.sendFile(
            path.join(__dirname, "../../news_system_client/build/index.html"),
            function(err){
                if(err){
                    res.status(500).send(err)
                }
            }
        )
    })

    await server.start();
    
    server.applyMiddleware({ app })

    mongoose.set('strictQuery', true);
    mongoose.connect(MONGODB)
        .then(()=>{
            console.log("MONGODB connected!")
            return app.listen({ port: 4000 }, () =>
            console.log(`🚀 Server now is ready at http://localhost:4000${server.graphqlPath}`)
          );
        }).then((res: any) => {
            console.log(`Server running at ${res}`)
        })
}

startApolloServer()