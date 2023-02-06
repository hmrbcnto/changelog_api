import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(2000, () => {
	console.log('running on http://localhost:2000');
});

