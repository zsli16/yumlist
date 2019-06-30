require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser')();
const router = require('./router');
const cors = require('koa-cors');

const port = process.env.PORT || 80;
const db = require('./models');

app.use(cors());

app.use(bodyParser);
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(koaStatic)(path.join(__dirname + '../build'));

app.use(router.routes());

(async () => {
  await db.sequelize.drop();                 // drop db and
  await db.sequelize.sync({ force: true });  // restart it

  await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`) // eslint-disable-line no-console
  });
})()



