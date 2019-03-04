const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

// router.post('like/:listId/:restaurantId/', ctrl.likeRestaurantByList);
// router.post('unlike/:listId/:restaurantId/', ctrl.removeLikeRestaurantByList);

router.put('/:listId/:restaurantId/:vote', ctrl.updateVote);

router.get('/:listId', ctrl.getListInfo);

router.get('/load/:listId', ctrl.loadFavoritesFromList);

router.get('/loadshared/:listId', ctrl.loadFavoritesFromListWithScore);

router.post('/search', ctrl.searchRestaurants); 

router.post('/createlist', ctrl.createList); 

router.post('/addtofavorites/:list', ctrl.addToFavorites); // done

router.delete('/removefromfavorites/:list/:id', ctrl.removeFromFavorites); // done


module.exports = router;