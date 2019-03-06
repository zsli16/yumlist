const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')();
const router = require('./router');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
// const koaStatic = require('koa-static');

dotenv.config();

app.use(cors());

app.use(bodyParser);
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(koaStatic)(path.join(__dirname + '../build'));

app.use(router.routes());


app.listen(3001, () => console.log('Listening at port 3001'));
