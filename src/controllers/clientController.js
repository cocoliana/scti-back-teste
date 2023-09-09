import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signupClient(req, res) {
  const participant = req.body;

  try {

    const verifyUser = await db.query(`SELECT * FROM participants WHERE email = $1`, [participant.email])
    if (verifyUser.rowCount > 0) {
      return res.status(409).send("email already in use")
    }

    const passwordHash = bcrypt.hashSync(participant.password, 10);
    await db.query(
      `INSERT INTO participants (name, email, password) VALUES ($1, $2, $3) `,
      [participant.name, participant.email, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getAllParticipants(req, res) {
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

export async function confirmPayment(req, res) {
  const participant = req.body;
  const id = parseInt(participant.id)
  console.log("id ", id)
  try {
    await db.query(

      `UPDATE participants SET "isPaid" = $1 WHERE id = $2`, [true, id]
    )
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

}

export async function denyPayment(req, res) {
  const participant = req.body;
  const id = parseInt(participant.id)
  console.log("id ", id)
  try {
    await db.query(
      `UPDATE participants SET "isPaid" = $1 WHERE id = $2`, [false, participant.id]
    )
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

}

export async function getUserById(req, res) {
  const participant = req.body;
  try {
    const participantInfo = await db.query(
      `SELECT * FROM participants WHERE id = $1`, [participant.id]
    )
    res.send(participantInfo).status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);

  }
}

export async function login(req, res) {
  const participant = req.body
  const email = participant.email
  try {
    const verifyUser = await db.query(
      `SELECT * FROM participants WHERE email = $1`, [email]
    )
    if (verifyUser.rowCount == 0) {
      return res.status(401).send("email não encontrado")
    }
    if (!(bcrypt.compareSync(participant.password, verifyUser.rows[0].password))) {
      return res.status(401).send("senha inválida")
    }
    if (!verifyUser.rows[0].isPaid) {
      console.log(verifyUser.rows[0].isPaid)
      return res.status(401).send("problema com pagamento")
    }

    res.status(200).send(verifyUser.rows)



  } catch (err) {
    return console.log(err)
  }

}

export async function logout(req, res) {

}
