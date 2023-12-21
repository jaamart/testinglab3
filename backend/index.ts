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
    const {name, shortname, id, corpform, bank, endofyear, booksfrequency} = req.body
    console.log(name, shortname, id, bank, endofyear, corpform, booksfrequency);


    const newClient = await client.query(
      'INSERT INTO clients (clientid, clientname, shortname, bank, endofyear, corporateform, booksfrequency) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [id, name, shortname, bank, endofyear, corpform, booksfrequency]
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
  const { rows } = await client.query('SELECT * FROM clients WHERE clientid = $1',[req.params.clientid])
  res.send(rows)
})

app.listen(port, () => {
  console.log(`Redo på ${port}`)
})
