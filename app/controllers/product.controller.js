/*importing the product model*/
const productModel= require('../models/product.model.js');

/*
1.	CREATE 
create and save a new product*/
exports.create = (req, res) => {
	//create a note
	const newProduct = new productModel({
        productId: req.body.productId,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price
	});

	/*save note in the database*/
	newProduct.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while creating the product."
		});
	});
};

/*
2.	RETRIEVE 
retrieve and return all products from the database*/
exports.findAll = (_req, res) => {
	productModel.find()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while retrieving Products."
		});
	});
};

/*find a single product with a productId*/
exports.findOne = (req, res) => {
	productModel.findOne({'productId': req.params.productId})
	.then(data => {
		if(!data) {
			return res.status(404).send({
				message: "Product not found with id " + req.params.productId
			});
		}
		res.send(data);
	}).catch(err => {
		return res.status(500).send({
			message: err.message || "Error retrieving Product with id " + req.params.productId
		});
	});
};

/*
3.	UPDATE
update a product identified by the productId in the request*/
exports.update = (req, res) => {
	/*find product and update it as per the request*/
	productModel.findOneAndUpdate({'productId': req.params.productId}, {
        productId: req.body.productId,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price
	}, {new: true})
	.then(data => {
		if(!data) {
			return res.status(404).send({
				message: "Product not found with id " + req.params.productId
			});
		}
		res.send(data);
	}).catch(err => {
		return res.status(500).send({
			message: err.message || "Error updating product with id " + req.params.productId
		});
	});

};

/*
4.	DELETE
delete a product with the specified productId in the request*/
exports.delete = (req, res) => {
	productModel.findOneAndRemove({'productId': req.params.productId})
	.then(data => {
		if(!data) {
			return res.status(404).send({
				message: "Product not found with id " + req.params.productId
			});
		}
		res.send({message: "Product deleted successfully!"})
	}).catch(err => {
		if(err.name === 'NotFound') {
			return res.status(404).send({
				message: "Product not found with id " + req.params.productId
			});
		}
		return res.status(500).send({
			message: "Could not delete the product with id " + req.params.productId
		});
	});
};


