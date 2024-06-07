'use server'
import { BASE_PRICE, PRODUCT_PRICE } from '@/config/products';
import { db } from '@/db';
import { Order } from '@prisma/client';
import {stripe} from '@/lib/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const createCheckoutSession = async ({configId}:{configId:string}) =>{
    const configuration = await db.configuration.findUnique({
        where:{
           id: configId
        },
    })
    if(!configuration){
        throw new Error("No such configuration found")
    }

    const {getUser} = getKindeServerSession()

    const user = await getUser();

    console.log(user);

    if(!user){
        throw new Error ('You need to be logged in')
    }

    const {finish,material} = configuration

    let price = BASE_PRICE

    if(finish === 'textured'){
        price += PRODUCT_PRICE.finish.textured
    }
    if(material === 'polycarbonate'){
        price += PRODUCT_PRICE.material.polycarbonate
    }

    let order:Order | undefined = undefined

    const existingorder = await db.order.findFirst({
        where:{
            userId:user.id,
            configurationId:configuration.id
        }
    })

    console.log(existingorder)

    if(existingorder){
        order = existingorder
    } else {
        console.log("start",configuration.id)
        order = await db.order.create({
            data:{
                amount:price /100,
                userId:user.id,
                configurationId:configuration.id,
            }
        })
        console.log("end...")
    }

    const product = await stripe.products.create({
        name:"Custom iphone Case",
        images:[configuration.imageUrl],
        default_price_data:{
            currency:"USD",
            unit_amount:price,
        }
    })

    const stripSession = await stripe.checkout.sessions.create({
        success_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types:['card','paypal'],
        mode:"payment",
        shipping_address_collection:{
            allowed_countries:['IN','US','DE']
        },
        metadata:{
            userId:user.id,
            orderId:order.id
        },

        line_items:[{price:product.default_price as string,quantity:1}],
    })

    return {url: stripSession.url}

}