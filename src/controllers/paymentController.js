import db from "../db.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Create a new customer and then create an invoice item then invoice it:

const storeItems = new Map([
    [1,{priceInCents:5000, name:"Ingresso SCTI"}],
    [2,{priceInCents:30000, name:"Learn CSS today"}],
])


export async function payment(req, res){
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return{
                    price_data:{
                        currency: 'brl',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success` ,
            cancel_url:`${process.env.SERVER_URL}/fail`
        })
        res.json({url:session.url})
    } catch(e){
        res.status(500).json({error:e.message})
    }

}