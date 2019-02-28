const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

router.get('/', ctrl.loadFavorites);

router.post('/search', ctrl.searchRestaurants);

router.post('/addtofavorites', ctrl.addToFavorites)

router.delete('/removefromfavorites/:id', ctrl.removeFromFavorites);

router.post('/createlist', ctrl.createList);

module.exports = router;