import db from "../db.js";

export async function signupClient(req, res) {
  const client = req.body;

  try {
    await db.query(
      `INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3) `,
      [client.name, client.address, client.phone]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
