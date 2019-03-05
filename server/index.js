const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')();
const router = require('./router');
const cors = require('@koa/cors');

app.use(cors());

app.use(bodyParser);
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(koaStatic)(path.join(__dirname + '../build'));

app.use(router.routes());


app.listen(3001, () => console.log('Listening at port 3001')); // eslint-disable-line no-console
