const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

router.post('/search', ctrl.searchRestaurants);

router.post('/addtofavorites', ctrl.addToFavorites)

module.exports = router;