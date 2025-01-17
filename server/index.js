require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const pgp = require('pg-promise')(/* options */);
const fs = require('fs');
const db_pw = fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf-8') 
const db = pgp(
	`postgres://${process.env.DB_USER}:${db_pw}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // enables req.body

app.get('/', async (req, res) => {
	try {
		const data = await db.one('SELECT * FROM cars');
    res.json(data)
	} catch (error) {
		res.json({ error });
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
