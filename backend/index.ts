import cors from 'cors'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'

dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()

const app = express(),
  port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/api', async (req, res) => {
  const { rows } = await client.query(
    'SELECT * FROM users',
  )
  res.send(rows)
})

app.post('/api/clients', async (req, res) => {
  try {
    const {name, shortname, id, corpform, bank, endofyear, booksfrequency, vatfrequency} = req.body
    console.log(name, shortname, id, bank, endofyear, corpform, booksfrequency, vatfrequency);

    const newClient = await client.query(
      'INSERT INTO clients (clientid, clientname, shortname, bank, endofyear, corporateform, booksfrequency, vatfrequency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [id, name, shortname, bank, endofyear, corpform, booksfrequency, vatfrequency]
      )
    const newClientData = await client.query(
      'SELECT * FROM clients WHERE clientid = $1', [id]
    )

    res.status(200).json({ newClient: newClientData.rows[0] })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({message: 'fel'})
      }
    }
  }
)

app.get('/api/clients', async (req, res) => {
  const { rows } = await client.query(
    'SELECT * FROM clients'
  )
  res.send(rows)
})

app.get('/api/client/:clientid', async (req, res) => {
  const { rows } = await client.query(
    `SELECT clients.*, months.*, bookkeeping.*, vat.*
    FROM clients
    LEFT JOIN bookkeeping ON clients.clientid = bookkeeping.clientId
    LEFT JOIN vat ON clients.clientid = vat.clientId AND bookkeeping.MonthID = vat.MonthID
    LEFT JOIN months ON bookkeeping.monthId = months.monthId
    WHERE clients.clientid = $1`,
    [req.params.clientid])
  res.send(rows)
})

app.put("/api/client/books", async (req, res) => {
  const {id, monthId, done, booksfreq} = req.body;
  console.log(id, monthId, done, booksfreq);
  if (booksfreq === 3) {
    const monthTwo = monthId + 1
    const monthThree = monthId + 2

    await client.query(
      'UPDATE bookkeeping SET IsBookkeepingDone = $1 WHERE clientId = $2 AND monthId IN ($3, $4, $5)', [
        done, id, monthId, monthTwo, monthThree
      ]
    )
  }

  await client.query(
    'UPDATE bookkeeping SET IsBookkeepingDone = $1 WHERE clientId = $2 AND monthId = $3', [
      done, id, monthId
    ]
  )
})

app.put("/api/client/vat", async (req, res) => {
  const {id, monthId, done, vatfreq} = req.body;
  console.log(id, monthId, done, vatfreq);

  if (vatfreq === 3) {
    const monthTwo = monthId + 1
    const monthThree = monthId + 2

    await client.query(
      'UPDATE vat SET IsVATDone = $1 WHERE clientId = $2 AND monthId IN ($3, $4, $5)', [
        done, id, monthId, monthTwo, monthThree
      ]
    )
  }

  await client.query(
    'UPDATE vat SET IsVATDone = $1 WHERE clientId = $2 AND monthId = $3', [
      done, id, monthId
    ]
  )
})

app.delete('/api/delete/:clientid', async (req, res) => {
  const {id} = req.body
  await client.query("DELETE FROM bookkeeping WHERE clientid = $1", [id])
  await client.query("DELETE FROM vat WHERE clientid = $1", [id])
  await client.query("DELETE FROM clients WHERE clientid = $1", [id])
  res.send(`Client with id ${id} deleted!`)
})

app.listen(port, () => {
  console.log(`Redo på ${port}`)
})
