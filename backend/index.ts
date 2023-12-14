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

app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/api', async (req, res) => {
  const { rows } = await client.query(
    'SELECT * FROM users',
  )
  res.send(rows)
})

app.post('/api/clients', async (req, res) => {
   try {
    //const {name, shortname, id, bank, endofyear} = req.body
    const newClient = await client.query(
          'INSERT INTO clients (clientid, name, shortname, bank, endofyear) VALUES ($1, $2, $3, $4, $5)',
          [12, 'test', 'test', 'seb', 12]
          )
        res.status(200).json({message: 'Användare reggad' })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: 'fel'})
    }
  }
)

app.get('/api/clients', async (req, res) => {
  const { rows } = await client.query(
    'SELECT * FROM clients'
  )
  res.send(rows)
})


app.listen(port, () => {
  console.log(`Redo på ${port}`)
})
