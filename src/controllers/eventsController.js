import db from "../db.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Create a new customer and then create an invoice item then invoice it:

const storeItems = new Map([
    [1, { priceInCents: 5000, name: "Ingresso SCTI" }],
    [2, { priceInCents: 30000, name: "Learn CSS today" }],
])


export async function payment(req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/fail`
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}

export async function cadastrarEventosSegunda(req, res) {
    const evento = req.body

    try {
        await db.query(`
        INSERT INTO monday (course, "timeLecture", "timeCourse", lecture, "speakerLecture" ,"speakerCourse", qtd) 
        values ($1, $2, $3, $4, $5, $6, $7)
        `, [evento.course, evento.timeLecture, evento.timeCourse,
        evento.lecture, evento.speakerLecture, evento.speakerCourse, evento.qtd]);

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}
export async function getEventsMonday(req, res) {
    try {
        const mondayEvents = await db.query(`
        SELECT * FROM monday;
        `)

        res.send(mondayEvents.rows).status(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }


}

export async function getMyEventsMonday(req, res) {
    const idMonday = req.params.idMonday;

    try {
        const mondayEvents = await db.query(`
        SELECT * FROM monday WHERE id = $1 ;
        `, [idMonday])

        res.send(mondayEvents.rows).status(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}

export async function setMonday(req, res) {
    const user = req.body;
    let mondayId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idMondayNullability
    const { email } = res.locals.user
    console.log("aqui b", user)

    try {
        await db.query(`UPDATE participants SET "idMonday" = $1 WHERE email = $2 `, [mondayId, email]);
        //const idMonday = await db.query(` SELECT * FROM participants WHERE email= $1`, [email]) //id do minicurso que a pessoa fara
        //se for o primeiro click só decrementa, se não, decrementa em um e incrementa no outro
        if (idNullability === null) {
            console.log("eh null")
            await db.query(`UPDATE monday SET qtd = qtd-1 WHERE id = $1`, [mondayId])
        }
        if (idNullability !== null) {
            await db.query(`UPDATE monday SET qtd = qtd-1 WHERE id = $1`, [mondayId])
            let mondayEvents = await db.query(`SELECT * FROM monday WHERE id != $1 `, [mondayId])
            mondayEvents = mondayEvents.rows
            console.log(mondayEvents)

            if (mondayEvents.length > 0) {
                const mondayEventId = mondayEvents[0].id
                console.log(mondayEventId)
                await db.query(`UPDATE monday SET qtd = qtd+1 WHERE id = $1`, [mondayEventId])
            }

        }
        //await db.query(`UPDATE monday SET qtd-- WHERE id = "$1" `, [idMonday])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}



