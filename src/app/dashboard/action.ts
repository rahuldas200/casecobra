'use server'
import { db } from "@/db"
import { OderStatus } from "@prisma/client"

export const changeOrderStatus = async ({
    id,
    newStatus
}:{
    id:string,
    newStatus:OderStatus
}) => {
    await db.order.update({
        where:{id},
        data:{
            status:newStatus
        },
    })
}