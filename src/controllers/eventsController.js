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


//segunda
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


export async function getMyEventsMonday(req, res) {
    const idMonday = req.params.idDay;

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

export async function setMonday(req, res) {
    const user = req.body;
    let mondayId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idNullability
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

//terca

export async function cadastrarEventosTerca(req, res) {
    const evento = req.body

    try {
        await db.query(`
        INSERT INTO tuesday (course, "timeLecture", "timeCourse", lecture, "speakerLecture" ,"speakerCourse", qtd) 
        values ($1, $2, $3, $4, $5, $6, $7)
        `, [evento.course, evento.timeLecture, evento.timeCourse,
        evento.lecture, evento.speakerLecture, evento.speakerCourse, evento.qtd]);

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}


export async function getEventsTerca(req, res) {
    try {
        const tuesdayEvents = await db.query(`
        SELECT * FROM tuesday;
        `)

        console.log(tuesdayEvents.rows)
        res.send(tuesdayEvents.rows).status(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }


}



export async function getMyEventsTuesday(req, res) {
    const idTuesday = req.params.idDay;

    console.log(idTuesday)
    try {
        const tuesdayEvents = await db.query(`
        SELECT * FROM tuesday WHERE id = $1 ;
        `, [idTuesday])

        res.send(tuesdayEvents.rows).status(200)
        console.log(tuesdayEvents.rows)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}

export async function setTerca(req, res) {
    const user = req.body;
    let tercaId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idNullability
    const { email } = res.locals.user
    console.log("aqui b", user)

    try {
        await db.query(`UPDATE participants SET "idtuesday" = $1 WHERE email = $2 `, [tercaId, email]);
        //const idMonday = await db.query(` SELECT * FROM participants WHERE email= $1`, [email]) //id do minicurso que a pessoa fara
        //se for o primeiro click só decrementa, se não, decrementa em um e incrementa no outro
        if (idNullability === null) {
            console.log("eh null")
            await db.query(`UPDATE tuesday SET qtd = qtd-1 WHERE id = $1`, [tercaId])
        }
        if (idNullability !== null) {
            await db.query(`UPDATE tuesday SET qtd = qtd-1 WHERE id = $1`, [tercaId])
            let tuesdayEvents = await db.query(`SELECT * FROM tuesday WHERE id != $1 `, [tercaId])
            tuesdayEvents = tuesdayEvents.rows
            console.log(tuesdayEvents)

            if (tuesdayEvents.length > 0) {
                const tuesdayEventId = tuesdayEvents[0].id
                console.log(tuesdayEventId)
                await db.query(`UPDATE tuesday SET qtd = qtd+1 WHERE id = $1`, [tuesdayEventId])
            }

        }
        //await db.query(`UPDATE monday SET qtd-- WHERE id = "$1" `, [idMonday])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}



//quarta

export async function cadastrarEventosQuarta(req, res) {
    const evento = req.body

    try {
        await db.query(`
        INSERT INTO wednesday (course, "timeLecture", "timeCourse", lecture, "speakerLecture" ,"speakerCourse", qtd) 
        values ($1, $2, $3, $4, $5, $6, $7)
        `, [evento.course, evento.timeLecture, evento.timeCourse,
        evento.lecture, evento.speakerLecture, evento.speakerCourse, evento.qtd]);

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}


export async function getEventsQuarta(req, res) {
    try {
        const wednesdayEvents = await db.query(`
        SELECT * FROM wednesday;
        `)

        res.send(wednesdayEvents.rows).status(200)
        console.log("quarta", wednesdayEvents.rows)


    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }


}



export async function getMyEventsWednesday(req, res) {
    const idwednesday = req.params.idDay;

    console.log(idwednesday)
    try {
        const wednesdayEvents = await db.query(`
        SELECT * FROM wednesday WHERE id = $1 ;
        `, [idwednesday])

        res.send(wednesdayEvents.rows).status(200)
        console.log("quarta", wednesdayEvents.rows)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}

export async function setQuarta(req, res) {
    const user = req.body;
    let quartaId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idNullability
    const { email } = res.locals.user
    console.log("aqui b", user)

    try {
        await db.query(`UPDATE participants SET "idwednesday" = $1 WHERE email = $2 `, [quartaId, email]);
        //const idMonday = await db.query(` SELECT * FROM participants WHERE email= $1`, [email]) //id do minicurso que a pessoa fara
        //se for o primeiro click só decrementa, se não, decrementa em um e incrementa no outro
        if (idNullability === null) {
            console.log("eh null")
            await db.query(`UPDATE wednesday SET qtd = qtd-1 WHERE id = $1`, [quartaId])
        }
        else if (idNullability !== null) {
            await db.query(`UPDATE wednesday SET qtd = qtd-1 WHERE id = $1`, [quartaId])
            let wednesdayEvents = await db.query(`SELECT * FROM wednesday WHERE id != $1 `, [quartaId])
            wednesdayEvents = wednesdayEvents.rows
            console.log(wednesdayEvents)

            if (wednesdayEvents.length > 0) {
                const wednesdayEventId = wednesdayEvents[0].id
                console.log(wednesdayEventId)
                await db.query(`UPDATE wednesday SET qtd = qtd+1 WHERE id = $1`, [wednesdayEventId])
            }

        }
        //await db.query(`UPDATE monday SET qtd-- WHERE id = "$1" `, [idMonday])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}


//quinta

export async function cadastrarEventosQuinta(req, res) {
    const evento = req.body

    try {
        await db.query(`
        INSERT INTO thursday (course, "timeLecture", "timeCourse", lecture, "speakerLecture" ,"speakerCourse", qtd) 
        values ($1, $2, $3, $4, $5, $6, $7)
        `, [evento.course, evento.timeLecture, evento.timeCourse,
        evento.lecture, evento.speakerLecture, evento.speakerCourse, evento.qtd]);

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}


export async function getEventsQuinta(req, res) {
    try {
        const thursdayEvents = await db.query(`
        SELECT * FROM thursday;
        `)

        res.send(thursdayEvents.rows).status(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }


}



export async function getMyEventsThursday(req, res) {
    const idthursday = req.params.idDay;

    console.log(idthursday)
    try {
        const thursdayEvents = await db.query(`
        SELECT * FROM thursday WHERE id = $1 ;
        `, [idthursday])

        res.send(thursdayEvents.rows).status(200)
        console.log(thursdayEvents.rows)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}

export async function setQuinta(req, res) {
    const user = req.body;
    let quintaId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idNullability
    const { email } = res.locals.user
    console.log("aqui b", user)

    try {
        await db.query(`UPDATE participants SET "idthursday" = $1 WHERE email = $2 `, [quintaId, email]);
        //const idMonday = await db.query(` SELECT * FROM participants WHERE email= $1`, [email]) //id do minicurso que a pessoa fara
        //se for o primeiro click só decrementa, se não, decrementa em um e incrementa no outro
        if (idNullability === null) {
            console.log("eh null")
            await db.query(`UPDATE thursday SET qtd = qtd-1 WHERE id = $1`, [quintaId])
        }
        if (idNullability !== null) {
            await db.query(`UPDATE thursday SET qtd = qtd-1 WHERE id = $1`, [quintaId])
            let thursdayEvents = await db.query(`SELECT * FROM thursday WHERE id != $1 `, [quintaId])
            thursdayEvents = thursdayEvents.rows
            console.log(thursdayEvents)

            if (thursdayEvents.length > 0) {
                const thursdayEventId = thursdayEvents[0].id
                console.log(thursdayEventId)
                await db.query(`UPDATE thursday SET qtd = qtd+1 WHERE id = $1`, [thursdayEventId])
            }

        }
        //await db.query(`UPDATE monday SET qtd-- WHERE id = "$1" `, [idMonday])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}


//sexta

export async function cadastrarEventosSexta(req, res) {
    const evento = req.body

    try {
        await db.query(`
        INSERT INTO friday (course, "timeLecture", "timeCourse", lecture, "speakerLecture" ,"speakerCourse", qtd) 
        values ($1, $2, $3, $4, $5, $6, $7)
        `, [evento.course, evento.timeLecture, evento.timeCourse,
        evento.lecture, evento.speakerLecture, evento.speakerCourse, evento.qtd]);

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


}


export async function getEventsSexta(req, res) {
    try {
        const fridayEvents = await db.query(`
        SELECT * FROM friday;
        `)

        res.send(fridayEvents.rows).status(200)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }


}



export async function getMyEventsSexta(req, res) {
    const idfriday = req.params.idDay;

    console.log(idfriday)
    try {
        const fridayEvents = await db.query(`
        SELECT * FROM friday WHERE id = $1 ;
        `, [idfriday])

        res.send(fridayEvents.rows).status(200)
        console.log(fridayEvents.rows)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}

export async function setSexta(req, res) {
    const user = req.body;
    let sextaId = parseInt(user.id);
    const { isBool } = req.body;
    const idNullability = user.idNullability
    const { email } = res.locals.user
    console.log("aqui b", user)

    try {
        await db.query(`UPDATE participants SET "idfriday" = $1 WHERE email = $2 `, [sextaId, email]);
        //const idMonday = await db.query(` SELECT * FROM participants WHERE email= $1`, [email]) //id do minicurso que a pessoa fara
        //se for o primeiro click só decrementa, se não, decrementa em um e incrementa no outro
        if (idNullability === null) {
            console.log("eh null")
            await db.query(`UPDATE friday SET qtd = qtd-1 WHERE id = $1`, [sextaId])
        }
        else if (idNullability !== null) {
            await db.query(`UPDATE friday SET qtd = qtd-1 WHERE id = $1`, [sextaId])
            let fridayEvents = await db.query(`SELECT * FROM friday WHERE id != $1 `, [sextaId])
            fridayEvents = fridayEvents.rows
            console.log(fridayEvents)

            if (fridayEvents.length > 0) {
                const fridayEventId = fridayEvents[0].id
                console.log(fridayEventId)
                await db.query(`UPDATE friday SET qtd = qtd+1 WHERE id = $1`, [fridayEventId])
            }

        }
        //await db.query(`UPDATE monday SET qtd-- WHERE id = "$1" `, [idMonday])
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);

    }

}