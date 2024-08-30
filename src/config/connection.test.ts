const pg = require('pg');
import * as dotenv from 'dotenv';

dotenv.config();

export async function testConnection() {
	const config = {
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		ssl: {
			rejectUnauthorized: true,
			ca: process.env.DB_CA,
		},
	};
	const client = new pg.Client(config);
	await client.connect();

	try {
		const result = await client.query('SELECT VERSION()');
		console.log(result.rows[0].version);
	} catch (err) {
		throw err;
	} finally {
		await client.end();
	}
}