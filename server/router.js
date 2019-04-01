const Router = require('koa-router');
const ctrl = require('./controller');
const db = require('./models');
const router = new Router();

const yelp = require('yelp-fusion');
const apiKey = 'h4_q1q5YJlDRpeOGv3eqZKyDjvxbcbneydPEJf5JXwvTz3VaLW9tWHymOGEBvqsWlgXCahNAiXlCHk__6lNhGXJiwfVOd5dBt3HKCxPb8bvykHOJ3BCzaneanFV0XHYx';
const client = yelp.client(apiKey);

// add and remove votes on each list
router.post('/addvote', (ctx) => ctrl.addVote(ctx, db));
router.delete('/removevote', (ctx) => ctrl.removeVote(ctx, db));

router.put('/updateshared/:listId', (ctx) => ctrl.loadVotesFromAllUsers(ctx, db));

router.get('/loadshared/:listId', (ctx) => ctrl.loadFavoritesFromListWithScore(ctx, db));

router.get('/:listId', (ctx) => ctrl.getListInfo(ctx, db));

router.get('/load/:listId', (ctx) => ctrl.loadFavoritesFromListWithScore(ctx, db));

router.post('/search', (ctx) => ctrl.searchRestaurants(ctx, client));

router.post('/createlist', (ctx) => ctrl.createList(ctx, db));

router.post('/addtofavorites/:list', (ctx) => ctrl.addToFavorites(ctx, db)); // done

router.delete('/removefromfavorites/:list/:id', (ctx) => ctrl.removeFromFavorites(ctx, db)); // done

module.exports = router;