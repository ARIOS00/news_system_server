import DataLoader from "dataloader";
import Right from "../models/Right";
import mongoose from "mongoose";

interface rightsInterface {
    title?: string | undefined;
    key?: string | undefined;
    pagepermission?: boolean | undefined;
    grade?: number | undefined;
}

type BatchRight = (ids: number[]) => Promise<rightsInterface[]>

const batchRights: BatchRight = async (ids) => {
    const rights = await Right.find({_id: {$in: ids}})
    const rightMap: { [key: string]: rightsInterface} = {}
    

    rights.forEach((right) => {
        const rightId = right._id.toString()
        rightMap[rightId] = right
    })

    return ids.map((id) => {
        return rightMap[id]
    })
}

//@ts-ignore
export const rightLoader = new DataLoader<number, rightsInterface>(batchRights)