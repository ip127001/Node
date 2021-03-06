const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = new mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             //update the product
//             dbOp = db.collection('products').updateOne({
//                 _id: this._id
//             }, {
//                 $set: this
//             });
//         } else {
//             //insert the new product
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 return result;
//             })
//             .catch(err => {
//                 console.log(err)
//                 throw err;
//             });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log("all products fetchAll:=", products);
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//             .find({
//                 _id: new mongodb.ObjectId(prodId)
//             })
//             .next()
//             .then(product => {
//                 console.log("fetchById only products which matches the id:=", product);
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .deleteOne({
//                 _id: new mongodb.ObjectId(prodId)
//             })
//             .then(result => {
//                 console.log("deleteById delete first product matching criteria", result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = Product;