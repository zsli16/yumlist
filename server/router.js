const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

// add and remove votes on each list
router.post('/addvote', ctrl.addVote);
router.delete('/removevote', ctrl.removeVote);


router.put('/updateshared/:listId', ctrl.loadVotesFromAllUsers);

router.get('/loadshared/:listId', ctrl.loadFavoritesFromListWithScore);



router.put('/:listId/:restaurantId/:voted', ctrl.updateVote);

router.get('/:listId', ctrl.getListInfo);

router.get('/load/:listId', ctrl.loadFavoritesFromList);


router.post('/search', ctrl.searchRestaurants); 

router.post('/createlist', ctrl.createList); 

router.post('/addtofavorites/:list', ctrl.addToFavorites); // done

router.delete('/removefromfavorites/:list/:id', ctrl.removeFromFavorites); // done


module.exports = router;