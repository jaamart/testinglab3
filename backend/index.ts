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

app.use(cors())

app.get('/api', async (request, response) => {
  const { rows } = await client.query(
    'SELECT * FROM users',
    // 'SELECT * FROM users WHERE name = $1',
    // ['Stockholm']
  )

  response.send(rows)
})

app.listen(port, () => {
  console.log(`Redo på ${port}.`)
})
