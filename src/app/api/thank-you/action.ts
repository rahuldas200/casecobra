'use server'

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const getPamentStatus = async ({orderId}:{orderId:string}) => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user?.id || user?.email){
        throw new Error("You need to login in to view this page")
    }

    const order = await db.order.findFirst({
        where:{id:orderId,userId:user?.id},
        include:{
            bilingAddress:true,
            configuration:true,
            shipingAddress:true,
            user:true,
        }
    })

    if(!user) throw new Error ('this order does not exits')

    if(order?.isPaid){
        return order
    } else {
        return false;
    }

}