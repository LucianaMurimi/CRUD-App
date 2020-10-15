const { Mixed } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*defining the schema*/
const productSchema = new Schema({
    productId: Number,
    productName: String,
    description: Object,
    price: Number
}, {
    collection: 'Product'
}, {
    timestamps: true
});

/*
Exporting the model:
the model constructor is called on the mongoose instance,
and passed to it are: 
    1.  the name of the collection -> Product
    2.  a reference to the schema defination -> productSchema
*/
module.exports = mongoose.model('Product', productSchema);

