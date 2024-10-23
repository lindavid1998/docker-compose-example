require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const pgp = require('pg-promise')(/* options */);
// const db = pgp(
// 	`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
// );
const db = pgp(`postgres://postgres:password@db:5432/postgres`);


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // enables req.body

app.get('/', async (req, res) => {
	try {
		const data = await db.one('SELECT * FROM cars');
    res.json(data)
    // res.json({ message: 'hello from express'})
	} catch (error) {
		res.json({ error });
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
