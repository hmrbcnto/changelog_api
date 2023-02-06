import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect, createJWT } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	res.status(200);
	res.json({
		message: 'hello'
	})	
});

app.use('/api', [protect, router]);
app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use((err, req, res, next) => {
	switch(err.type) {
		case 'auth':
			res.status(401).json({ message: 'unauthorized' });
			break;
		case 'input':
			res.status(400).json({ message: 'bad request' });
			break;
		default:
			res.status('500').json({ message: 'internal server error' });
	};

})

export default app;
