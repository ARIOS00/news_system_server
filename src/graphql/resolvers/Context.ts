import {Model} from 'mongoose'

interface Args {
    userInput: {
        username: string
        password: string
    }
}

interface userInterface {
    id?: number | undefined;
    username?: string | undefined;
    password?: string | undefined;
    roleState?: boolean | undefined;
    default?: boolean | undefined;
    region?: string | undefined;
    roleId?: number | undefined;
}

interface roleInterface {
    id?: number | undefined;
    roleName?: string | undefined;
    roleType?: number | undefined;
    rights?: rightInterface | undefined;
}

interface rightInterface {
    checked?: [string] | undefined;
    halfChecked?: [string] | undefined;
}

interface childrenInterface {
    title?: string | undefined;
    key?: string | undefined;
    grade?: number | undefined;
    rightId?: string | undefined;
}

interface rightsInterface {
    title?: string | undefined;
    key?: string | undefined;
    pagepermission?: boolean | undefined;
    grade?: number | undefined;
}

interface newTest {
    t?: String
}

interface categoryInterface {
    title?: string | undefined;
    value?: string | undefined;
}

interface newsInterface {
    title?: string | undefined
    categoryId?: string | undefined
    content?: string | undefined
    region?: string | undefined
    author?: string | undefined
    roleId?: string | undefined
    auditState?: number  | undefined
    publishState?: number | undefined
    createTime?: number | undefined
    star?: number | undefined
    view?: number | undefined
}

interface regionInterface {
    title? :string | undefined
    value? :string | undefined
}

interface Context {
    User: Model<userInterface>
    Role: Model<roleInterface>
    Children: Model<childrenInterface>
    Right: Model<rightsInterface>
    NewTest: Model<newTest>
    Category: Model<categoryInterface>
    News: Model<newsInterface>
    Region: Model<regionInterface>
    userInfo: {
        _id: number | null
    }
}

export {Args, Context}