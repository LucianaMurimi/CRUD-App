module.exports = (app) => {
	const products = require('../controllers/product.controller.js');

	/*create a new product record*/
	app.post('/products', products.create);

	/*retrieve all product records*/
	app.get('/products', products.findAll);

	/*retrieve a single product record using the productId*/
	app.get('/products/:productId', products.findOne);

	/*update a product record specified by the productId*/
	app.put('/products/:productId', products.update);

	/*delete a specified rproduct record*/
	app.delete('/products/:productId', products.delete);

}