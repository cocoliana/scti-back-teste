import db from "../db.js";

export async function signupClient(req, res) {
  const client = req.body;

  try {
    await db.query(
      `INSERT INTO participants (name, email, password) VALUES ($1, $2, $3) `,
      [client.name, client.email, client.password]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getAllParticipants(req, res){
  try {
   const participants = await db.query(
      `SELECT * FROM participants`
    )
    res.status(200).send(participants.rows)
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}