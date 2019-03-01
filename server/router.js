const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

router.get('/:listId', ctrl.loadFavoritesFromList);

router.post('/search', ctrl.searchRestaurants); 

router.post('/createlist', ctrl.createList); 

router.post('/addtofavorites/:list', ctrl.addToFavorites); // done

router.delete('/removefromfavorites/:list/:id', ctrl.removeFromFavorites); // done


module.exports = router;