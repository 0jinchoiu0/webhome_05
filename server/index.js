import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFolder = path.join(__dirname, '../data')
const dbFile = path.join(dataFolder, 'price.db')

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true })
}

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('無法開啟 SQLite 資料庫', err)
    process.exit(1)
  }
})

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS price_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      product TEXT NOT NULL,
      price REAL NOT NULL,
      source TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  )
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/prices', (req, res) => {
  const query = req.query.query ? `%${req.query.query.trim()}%` : null
  const startDate = req.query.startDate
  const endDate = req.query.endDate

  let sql = 'SELECT id, date, product, price, source FROM price_records WHERE 1=1'
  const params = []

  if (query) {
    sql += ' AND (product LIKE ? OR source LIKE ? OR date LIKE ?)'
    params.push(query, query, query)
  }
  if (startDate) {
    sql += ' AND date >= ?'
    params.push(startDate)
  }
  if (endDate) {
    sql += ' AND date <= ?'
    params.push(endDate)
  }

  sql += ' ORDER BY date DESC, id DESC'

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: '讀取資料失敗' })
      return
    }
    res.json(rows)
  })
})

app.post('/api/prices', (req, res) => {
  const { date, product, price, source } = req.body
  if (!date || !product || price == null || Number.isNaN(Number(price))) {
    res.status(400).send('請提供 date、product 與 price。')
    return
  }

  const stmt = db.prepare(
    'INSERT INTO price_records (date, product, price, source) VALUES (?, ?, ?, ?)' 
  )
  stmt.run(date, product.trim(), Number(price), source || '', function (err) {
    if (err) {
      console.error(err)
      res.status(500).json({ error: '新增資料失敗' })
      return
    }
    res.status(201).json({ id: this.lastID, date, product, price: Number(price), source })
  })
  stmt.finalize()
})

app.get('/api/products', (req, res) => {
  db.all('SELECT DISTINCT product FROM price_records ORDER BY product ASC', [], (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: '讀取商品列表失敗' })
      return
    }
    res.json(rows.map((row) => row.product))
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Express API 已啟動，監聽 http://127.0.0.1:${port}`)
})
