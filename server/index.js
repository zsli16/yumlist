const dotenv = require('dotenv');
const path = require('path');
const db = require('./models');

console.log('loading dotenv from', __dirname+'/.env');
dotenv.config({path: path.resolve(__dirname+'/.env') });

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')();
const router = require('./router');
const cors = require('@koa/cors');

const koaStatic = require('koa-static');

let port = process.env.PORT;
if (port == null || port === "") {
  port = 3001;
}


app.use(cors());

app.use(bodyParser);

app.use(koaStatic(path.join(__dirname + '../build')));

app.use(router.routes());

(async () => {
  await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
})()