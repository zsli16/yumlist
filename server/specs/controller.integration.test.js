const controller = require('../controller.js');
const test_db = require('../models');

const mock_ctx = {};
mock_ctx.params = {};
mock_ctx.request = {};
mock_ctx.params.list = {};
mock_ctx.params.id = '';
mock_ctx.params.listId = '';
mock_ctx.request.body = {};


describe('controller integration tests', () => {

  beforeEach(async () => {
    // Async
    await test_db.sequelize.sync({force: true});
  });

  afterEach(async () => {
    // Drops all tables
    await test_db.sequelize.drop();
  });

  afterAll(async () => {
    // Drops all tables
    test_db.sequelize.close();
  });

  describe('getListInfo', () => {

    test('should respond 200 if the list is found', async () => {
      let newList = {
        listname: 'test',
        listdetails: 'pepa',
        id: '1'
      };
      await test_db.Lists.create(newList);

      mock_ctx.params.listId = '1';
      await controller.getListInfo(mock_ctx, test_db);
      expect(mock_ctx.status).toEqual(200);
      expect(mock_ctx.body.id).toEqual(newList.id);
      expect(mock_ctx.body.listname).toEqual(newList.listname);
      expect(mock_ctx.body.listdetails).toEqual(newList.listdetails);
    });

    test('should respond 404 if the list is not found', async () => {
      let newList = {
        listname: 'test',
        listdetails: 'pepa',
        id: '1'
      };
      await test_db.Lists.create(newList);

      mock_ctx.params.listId = '2';
      await controller.getListInfo(mock_ctx, test_db);
      expect(mock_ctx.status).toEqual(404);
      expect(mock_ctx.body.error).toEqual('list not found');
    });
  });

  describe('addToFavorites', () => {

    test('should respond 200 if the addition is correct and to add the restaurant', async () => {
      let newList = {
        listname: 'test',
        listdetails: 'pepa',
        id: '1'
      };
      await test_db.Lists.create(newList);

      let newRestaurant = {
        id: 'pepita',
        name: 'pepita',
        rating: 4,
        url: '',
        review_count: 200
      };
      mock_ctx.request.body = newRestaurant;
      mock_ctx.params.list = '1';

      const spy = jest.spyOn(test_db.Favorites, 'create');
      await controller.addToFavorites(mock_ctx, test_db);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(mock_ctx.status).toEqual(200);
      expect(mock_ctx.body.id).toEqual(newRestaurant.id);
      spy.mockRestore();
    });

    test('should respond 200 if the addition is correct and not add the restaurant', async () => {
      let newList = {
        listname: 'test',
        listdetails: 'pepe',
        id: '1'
      };
      await test_db.Lists.create(newList);

      let newRestaurant = {
        id: 'pepito',
        name: 'pepito',
        rating: 4,
        url: '',
        review_count: 200
      };
      await test_db.Favorites.create(newRestaurant);

      mock_ctx.request.body = newRestaurant;
      mock_ctx.params.list = '1';

      const spy = jest.spyOn(test_db.Favorites, 'create');
      await controller.addToFavorites(mock_ctx, test_db);
      expect(spy).toHaveBeenCalledTimes(0);
      expect(mock_ctx.status).toEqual(200);
      expect(mock_ctx.body.id).toEqual(newRestaurant.id);
      spy.mockRestore();
    });

    test('should respond 400 if the restaurant is in the list', async () => {
      let newList = {
        listname: 'test',
        listdetails: 'pepa',
        id: '1'
      };
      await test_db.Lists.create(newList);

      let newRestaurant = {
        id: 'pepita',
        name: 'pepita',
        rating: 4,
        url: '',
        review_count: 200
      };
      mock_ctx.request.body = newRestaurant;
      mock_ctx.params.list = '1';

      await controller.addToFavorites(mock_ctx, test_db);
      await controller.addToFavorites(mock_ctx, test_db);

      expect(mock_ctx.status).toEqual(400);
      expect(mock_ctx.body.error).toEqual('Already added');
    });


  });

  describe('removeFromFavorites', () => {

    test('should respond 200 if restaurant is removed', async () => {

      mock_ctx.params.id = 'pepita';
      mock_ctx.params.list = '1';
      mock_ctx.params.listId = '1';

      let newList = {
        listname: 'test',
        listdetails: 'pepe',
        id: '1'
      };
      await test_db.Lists.create(newList);

      let newRestaurant = {
        id: 'pepita',
        name: 'pepita',
        rating: 4,
        url: '',
        review_count: 200
      };
      await test_db.Favorites.create(newRestaurant);

      await controller.addToFavorites(mock_ctx, test_db);

      await controller.loadFavoritesFromListWithScore(mock_ctx, test_db);
      const state1 = mock_ctx.body;
      await controller.removeFromFavorites(mock_ctx, test_db);
      await controller.loadFavoritesFromListWithScore(mock_ctx, test_db);
      const state2 = mock_ctx.body;

      expect(state1).not.toEqual(state2);
      expect(mock_ctx.status).toEqual(200);
    });

  });

  describe('createList', () => {

    test('should create a new list in the testDB', async () => {
      mock_ctx.params.id = 'pepita';
      mock_ctx.params.list = '1';
      mock_ctx.params.listId = '1';

      mock_ctx.request.body = {
        listname: 'test',
        listdetails: 'pepe',
        listId: '1'
      };

      await controller.getListInfo(mock_ctx, test_db);
      const state1 = mock_ctx.body;
      
      await controller.createList(mock_ctx, test_db);
      await controller.getListInfo(mock_ctx, test_db);
      const state2 = mock_ctx.body;

      expect(state1).not.toEqual(state2);
      expect(mock_ctx.status).toBe(200);

    });

  });

  describe('addVote', () => {
    test('should create a vote in the testDB', async () => {

      mock_ctx.request.body = {
        listId: '1',
        restaurantId: 'pepita',
        username: 'test',
      };

      const vote1 = await test_db.Votes.find({
        where: { user: 'test' },
      });

      await controller.addVote(mock_ctx, test_db);
      const vote2 = await test_db.Votes.find({
        where: { user: 'test' },
      });

      expect(vote1).not.toEqual(vote2);
      expect(mock_ctx.status).toBe(200);

    });

  });

  describe('removeVote', () => {
    test('should remove a vote in the testDB', async () => {

      mock_ctx.request.body = {
        listId: '1',
        restaurantId: 'pepita',
        username: 'test',
      };

      await controller.addVote(mock_ctx, test_db);
      
      const vote1 = await test_db.Votes.find({
        where: { user: 'test' },
      });

      await controller.removeVote(mock_ctx, test_db);

      const vote2 = await test_db.Votes.find({
        where: { user: 'test' },
      });

      expect(vote1).not.toEqual(vote2);
      expect(mock_ctx.status).toBe(200);

    });

  });
  
  describe('loadVotesFromAllUsers', () => {
    test('should update the scores from all restaurants in a list', async () => {
      
      mock_ctx.params.listId = '1';
      mock_ctx.params.list = '1';
      
      // creamos la lista
      mock_ctx.request.body = {
        listname: 'test',
        listdetails: 'pepe',
        listId: '1'
      };
      await controller.createList(mock_ctx, test_db);
      
      // creamos los restaurantes
      mock_ctx.request.body = {
        id: 'pepita',
        name: 'pepita',
        rating: 4,
        url: 'hello',
        review_count: 200
      };
      await controller.addToFavorites(mock_ctx, test_db);
      
      mock_ctx.request.body = {
        id: 'holo',
        name: 'holo',
        rating: 1,
        url: 'hello',
        review_count: 200
      };
      await controller.addToFavorites(mock_ctx, test_db);
      
      // añadimos un voto
      mock_ctx.request.body = {
        listId: '1',
        restaurantId: 'holo',
        username: 'test',
      };
      await controller.addVote(mock_ctx, test_db);
      
      // comprobamos la db.favouritelist.find, y deberia devolver la relacion con score 0
      let list1 = await test_db.FavoritesLists.findAll({
        where: { listId: '1' },
      });
      const holoCheckerBefore = list1.map(el => el.dataValues).filter(el => el.favoriteId === 'holo')[0]
      const pepitaCheckerBefore = list1.map(el => el.dataValues).filter(el => el.favoriteId === 'pepita')[0]
      
      // llamamos a la funcion
      await controller.loadVotesFromAllUsers(mock_ctx, test_db);
      
      // comprobamos otra vez
      let list2 = await test_db.FavoritesLists.findAll({
        where: { listId: '1' },
      });
      const holoCheckerAfter = list2.map(el => el.dataValues).filter(el => el.favoriteId === 'holo')[0]
      const pepitaCheckerAfter = list2.map(el => el.dataValues).filter(el => el.favoriteId === 'pepita')[0]
      
      expect(holoCheckerBefore.score).not.toEqual(holoCheckerAfter.score);
      expect(pepitaCheckerBefore.score).toEqual(pepitaCheckerAfter.score);
    });
      
  });
    
  describe('loadFavoritesFromListWithScore', () => {
    test('should load the restaurants with the correct updated scores', async () => {
      mock_ctx.params.listId = '1';
      mock_ctx.params.list = '1';
      
      // creamos la lista
      mock_ctx.request.body = {
        listname: 'test',
        listdetails: 'pepe',
        listId: '1'
      };
      await controller.createList(mock_ctx, test_db);

      await controller.loadFavoritesFromListWithScore(mock_ctx, test_db);
      const expectedEmpty = mock_ctx.body;
      
      // creamos los restaurantes
      mock_ctx.request.body = {
        id: 'pepita',
        name: 'pepita',
        rating: 4,
        url: 'hello',
        review_count: 200
      };
      await controller.addToFavorites(mock_ctx, test_db);
      
      mock_ctx.request.body = {
        id: 'holo',
        name: 'holo',
        rating: 1,
        url: 'hello',
        review_count: 200
      };
      await controller.addToFavorites(mock_ctx, test_db);

      await controller.loadFavoritesFromListWithScore(mock_ctx, test_db);
      const expectedScoreless = mock_ctx.body;

      // añadimos un voto
      mock_ctx.request.body = {
        listId: '1',
        restaurantId: 'holo',
        username: 'test',
      };
      await controller.addVote(mock_ctx, test_db);
      await controller.loadVotesFromAllUsers(mock_ctx, test_db);

      await controller.loadFavoritesFromListWithScore(mock_ctx, test_db);
      const expectedScoreFull = mock_ctx.body;

      expect(expectedEmpty).toEqual([]);
      expect(expectedScoreless[0]).not.toEqual(expectedScoreFull[0]);
      expect(expectedScoreless[1]).toEqual(expectedScoreFull[1]);
      
    });

  });
    
});

