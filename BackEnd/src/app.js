import express from 'express'
import morgan from 'morgan'
import routes from './routes/routes.js'
import cors from 'cors'

const app = express();

app.set('port',process.env.PORT || 3000)

app.use(cors({
    origin: 'http://localhost:8081'
}))

app.use(morgan('dev'));

app.use(express.json()); 

app.use(routes);

export default app