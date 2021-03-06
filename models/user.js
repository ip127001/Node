const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        console.log("id's", cp.productId, product._id);
        if (cp === []) {
            return -1;
        }
        return cp.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart;
    return this.save();

    // const db = getDb();
    // const prodId = product._id;

    // const updatedCart = {
    //     items: [{
    //         productId: new ObjectId(prodId),
    //         quantity: 1
    //     }]
    // }

    // return db.collection('users').updateOne({
    //     _id: this._id
    // }, {
    //     $set: {
    //         cart: updatedCart
    //     }
    // }).then(user => {
    //     return user;
    // });
}

userSchema.methods.deleteCartById = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = {
        items: []
    };
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart; //{items: [{}]}
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product) {

//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             console.log("id's", cp.productId, product._id);
//             if (cp === []) {
//                 return -1;
//             }
//             return cp.productId.toString() === product._id.toString();
//         })

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({
//                 productId: new ObjectId(product._id),
//                 quantity: newQuantity
//             });
//         }

//         const updatedCart = {
//             items: updatedCartItems
//         }

//         const db = getDb();
//         // const prodId = product._id;

//         // const updatedCart = {
//         //     items: [{
//         //         productId: new ObjectId(prodId),
//         //         quantity: 1
//         //     }]
//         // }

//         return db.collection('users').updateOne({
//             _id: this._id
//         }, {
//             $set: {
//                 cart: updatedCart
//             }
//         }).then(user => {
//             return user;
//         });
//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         return db.collection('products').find({
//                 _id: {
//                     $in: productIds
//                 }
//             })
//             .toArray()
//             .then(products => {
//                 console.log(this.cart.items);
//                 return products.map(p => {
//                     const obj = { ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString()
//                         }).quantity
//                     }
//                     console.log("object was get from cart", obj);
//                     return obj;
//                 })
//             });
//     }

//     deleteCartById(prodId) {
//         const arr = this.cart.items.filter(item => {
//             return item.productId.toString() !== prodId.toString();
//         })
//         const updatedCart = {
//             items: arr
//         };
//         const db = getDb();
//         return db.collection('users').updateOne({
//             _id: new ObjectId(this._id)
//         }, {
//             $set: {
//                 cart: updatedCart
//             }
//         })
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart().then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectId(this._id),
//                         name: this.name
//                     }
//                 };
//                 return db.collection('orders')
//                     .insertOne(order)
//             })
//             .then(result => {
//                 this.cart = {
//                     items: []
//                 };
//                 return db.collection('users').
//                 updateOne({
//                     _id: new ObjectId(this._id)
//                 }, {
//                     $set: {
//                         cart: {
//                             items: []
//                         }
//                     }
//                 })
//             })
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({
//                 'user._id': new ObjectId(this._id)
//             })
//             .toArray();
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({
//                 _id: new ObjectId(userId)
//             })
//             .then(user => {
//                 return user;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }

// module.exports = User;